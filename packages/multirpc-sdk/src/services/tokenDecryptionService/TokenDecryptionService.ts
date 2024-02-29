import { Web3KeyWriteProvider } from '@ankr.com/provider';

import {
  METAMASK_REJECTED_OPERATION_CODE,
  USER_DENIED_MESSAGE_SIGNATURE_CODE,
} from './TokenDecryptionServiceUtils';
import { Base64, DATE_MULTIPLIER } from '../../common';
import { MetamaskDecryptionService } from './MetamaskDecryptionService';
import { DecryptionService } from './DecryptionService';

export class TokenDecryptionService {
  public constructor(private readonly keyProvider: Web3KeyWriteProvider) { }

  public privateKey = '';

  public publicKey = '';

  private metamaskDecryptionService?: MetamaskDecryptionService;

  private decryptionService?: DecryptionService;

  private getMetamaskDecryptionService(): MetamaskDecryptionService {
    this.metamaskDecryptionService =
      this.metamaskDecryptionService ||
      new MetamaskDecryptionService(this.keyProvider);

    return this.metamaskDecryptionService;
  }

  private getDecryptionService(): DecryptionService {
    this.decryptionService =
      this.decryptionService || new DecryptionService(this.keyProvider);

    return this.decryptionService;
  }

  public async requestEncryptionKeys(): Promise<{
    privateKey: Base64;
    publicKey: Base64;
  }> {
    let privateKey = '';
    let publicKey = '';

    try {
      const { privateKey: privateString, publicKey: publicString } =
        await this.getDecryptionService().requestEncryptionKeys();

      privateKey = privateString;
      publicKey = publicString;
    } catch (error: any) {
      if (error?.code === USER_DENIED_MESSAGE_SIGNATURE_CODE) {
        throw new Error(error);
      }
    }

    this.privateKey = privateKey;
    this.publicKey = publicKey;

    return { privateKey, publicKey };
  }

  public async decryptToken(signedToken: string, expiresAt?: number) {
    const MS_IN_YEAR = 31_556_952_000;
    // 15.10.2022
    const NEW_AUTHORIZATION_FLOW_RELEASE_DATE = 1_665_763_200_000;
    const tokenIssueDate = Number(expiresAt) * DATE_MULTIPLIER - MS_IN_YEAR;

    let decryptedToken = '';

    if (expiresAt && tokenIssueDate < NEW_AUTHORIZATION_FLOW_RELEASE_DATE) {
      decryptedToken =
        await this.getMetamaskDecryptionService().getDecryptedTokenByMetamask(
          signedToken,
        );
    } else {
      try {
        if (!this.privateKey) {
          await this.requestEncryptionKeys();
        }

        // try to decrypt token with sigUtil
        decryptedToken = await this.getDecryptionService().getDecryptedToken(
          signedToken,
          this.privateKey,
        );
      } catch (error: any) {
        if (error?.code === METAMASK_REJECTED_OPERATION_CODE) {
          throw error;
        }

        // try to decrypt token with metamask
        try {
          decryptedToken =
            await this.getMetamaskDecryptionService().getDecryptedTokenByMetamask(
              signedToken,
            );
        } catch (error: any) {
          if (error?.code === USER_DENIED_MESSAGE_SIGNATURE_CODE) {
            throw error;
          } else {
            throw new Error('An error occurred while receiving the jwt token. Please contact our support team to solve the problem');
          }
        }
      }
    }

    if (!decryptedToken) {
      throw new Error('Failed to load encryption key');
    }

    return decryptedToken;
  }

  public async requestMetamaskEncryptionKey(): Promise<Base64> {
    const { currentAccount } = this.keyProvider;

    const publicKey =
      await this.getMetamaskDecryptionService().getMetamaskEncryptionPublicKey(
        currentAccount,
      );

    this.publicKey = publicKey;

    return publicKey;
  }
}
