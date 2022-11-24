import { Web3KeyWriteProvider } from '@ankr.com/provider';

import { BackofficeGateway, IBackofficeGateway } from '../../backoffice';
import { LoginSignService } from '../loginSignService';

export class AdminMrpcSdk {
  private backofficeGateway?: IBackofficeGateway;

  public constructor(
    private readonly keyProvider: Web3KeyWriteProvider,
    private readonly baseURL: string,
  ) {}

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
