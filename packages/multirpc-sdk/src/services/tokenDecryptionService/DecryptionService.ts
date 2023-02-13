import * as sigUtil from 'eth-sig-util';
import { Web3KeyWriteProvider } from '@ankr.com/provider';

import {
  base64StrToUtf8String,
  getEncryptionPublicKey,
} from './TokenDecryptionServiceUtils';
import { Base64 } from '../../common';

export class DecryptionService {
  public constructor(private readonly keyProvider: Web3KeyWriteProvider) {}

  public async requestEncryptionKeys(): Promise<{
    privateKey: Base64;
    publicKey: Base64;
  }> {
    const { privateKey, publicKey } = await getEncryptionPublicKey(
      this.keyProvider,
    );

    return { privateKey, publicKey };
  }

  public async getDecryptedToken(signedToken: string, privateKey: string) {
    const encryptedJwtJsonString = base64StrToUtf8String(signedToken);
    const encryptedJwtJson = JSON.parse(encryptedJwtJsonString);

    return sigUtil.decrypt(encryptedJwtJson, privateKey);
  }
}
