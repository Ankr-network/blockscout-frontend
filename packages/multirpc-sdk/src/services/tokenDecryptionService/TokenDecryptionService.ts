import { Web3KeyWriteProvider } from '@ankr.com/provider';

import { METAMASK_REJECTED_OPERATION_CODE } from './TokenDecryptionServiceUtils';
import { Base64, DATE_MULTIPLIER, IJwtToken } from '../../common';
import { MetamaskDecryptionService } from './MetamaskDecryptionService';
import { DecryptionService } from './DecryptionService';

export class TokenDecryptionService {
  public constructor(private readonly keyProvider: Web3KeyWriteProvider) {}

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
    const { privateKey, publicKey } =
      await this.getDecryptionService().requestEncryptionKeys();

    this.privateKey = privateKey;
    this.publicKey = publicKey;

    return { privateKey, publicKey };
  }

  public async decryptToken(jwtToken: IJwtToken) {
    const MS_IN_YEAR = 31_556_952_000;
    // 15.10.2022
    const NEW_AUTHORIZATION_FLOW_RELEASE_DATE = 1_665_763_200_000;
    const tokenIssueDate =
      Number(jwtToken.expires_at) * DATE_MULTIPLIER - MS_IN_YEAR;

    let signedToken = '';

    if (tokenIssueDate < NEW_AUTHORIZATION_FLOW_RELEASE_DATE) {
      signedToken =
        await this.getMetamaskDecryptionService().getDecryptedTokenByMetamask(
          jwtToken.signed_token,
        );
    } else {
      try {
        if (!this.privateKey) {
          await this.requestEncryptionKeys();
        }
        // try to decrypt token with sigUtil
        signedToken = await this.getDecryptionService().getDecryptedToken(
          jwtToken,
          this.privateKey,
        );
      } catch (error: any) {
        if (error?.code === METAMASK_REJECTED_OPERATION_CODE) {
          throw error;
        }

        // try to decrypt token with metamask
        signedToken =
          await this.getMetamaskDecryptionService().getDecryptedTokenByMetamask(
            jwtToken.signed_token,
          );
      }
    }

    if (!signedToken) {
      throw new Error('Failed to load encryption key');
    }

    return signedToken;
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
