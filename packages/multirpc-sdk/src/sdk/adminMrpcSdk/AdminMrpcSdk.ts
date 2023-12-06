import { Web3KeyWriteProvider } from '@ankr.com/provider';

import { BackofficeGateway, IBackofficeGateway } from '../../backoffice';
import { UAuthGateway, } from '../../uauth/UAuthGateway';
import { IUAuthGateway } from '../../uauth/interfaces';
import { LoginSignService } from '../../services';

export class AdminMrpcSdk {
  private backofficeGateway?: IBackofficeGateway;

  private uAuthGateway?: IUAuthGateway;

  public constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
    private readonly baseURL: string,
    private readonly uAuthURL: string,
  ) { }

  getKeyProvider() {
    return this.keyProvider;
  }

  getBackofficeGateway(): IBackofficeGateway {
    this.backofficeGateway =
      this.backofficeGateway ||
      new BackofficeGateway({
        baseURL: this.baseURL,
      });

    return this.backofficeGateway;
  }

  getUAuthGateway(): IUAuthGateway {
    this.uAuthGateway =
      this.uAuthGateway ||
      new UAuthGateway({
        baseURL: this.uAuthURL,
      });

    return this.uAuthGateway;
  }

  public async authorizeBackoffice(lifeTime: number): Promise<string> {
    if (!this.keyProvider) {
      throw new Error('Key provider must be connected');
    }

    const loginSignService = new LoginSignService(this.keyProvider);

    const token = await loginSignService.signLoginData(
      lifeTime,
      'Multirpc Backoffice Login Message:',
    );

    return token;
  }
}
