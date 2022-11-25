import { Web3KeyWriteProvider } from '@ankr.com/provider';
import { bytesToHex } from 'web3-utils';

import { catchSignError } from './LoginSignServiceUtils';

export class LoginSignService {
  public constructor(private readonly keyProvider: Web3KeyWriteProvider) {}

  async sign(
    data: Buffer | string | Record<string, unknown>,
    address: string,
  ): Promise<string> {
    try {
      if (typeof data === 'object') {
        data = bytesToHex(data as any);
      }

      const token = await this.keyProvider
        .getWeb3()
        .eth.personal.sign(data, address, '');

      return token;
    } catch (error: any) {
      return catchSignError(error);
    }
  }

  async signLoginData(lifeTime: number, message: string): Promise<string> {
    const currentTime = Math.floor(new Date().getTime());
    const expiresAfter = currentTime + lifeTime;
    const data = `${message}\n${expiresAfter}`;
    const { currentAccount: address } = this.keyProvider;

    const signature = await this.sign(data, address);
    const formData = `signature=${signature}&address=${address}&expires=${expiresAfter}`;

    return Buffer.from(formData, 'utf8').toString('base64');
  }
}
