import { Web3KeyWriteProvider } from '@ankr.com/provider';

import { Base64, Web3Address } from '../../common';

export class MetamaskDecryptionService {
  public constructor(private readonly keyProvider: Web3KeyWriteProvider) {}

  private async decryptMessageUsingPrivateKey(
    compatibleJsonData: string,
  ): Promise<string> {
    const { currentAccount } = this.keyProvider;

    return this.keyProvider.getWeb3().givenProvider.request({
      method: 'eth_decrypt',
      params: [compatibleJsonData, currentAccount],
    });
  }

  public async getDecryptedTokenByMetamask(jwtSignedToken: Base64) {
    const metaMaskJsonData = Buffer.from(jwtSignedToken, 'base64').toString(
      'ascii',
    );

    const signedToken = await this.decryptMessageUsingPrivateKey(
      metaMaskJsonData,
    );

    return signedToken;
  }

  public async getMetamaskEncryptionPublicKey(
    account: Web3Address,
  ): Promise<Base64> {
    return this.keyProvider.getWeb3().givenProvider.request({
      method: 'eth_getEncryptionPublicKey',
      params: [account],
    });
  }
}
