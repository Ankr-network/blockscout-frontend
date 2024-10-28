import { BackofficeGateway, IBackofficeGateway } from '../../backoffice';
import { UAuthGateway, } from '../../uauth/UAuthGateway';
import { IUAuthGateway } from '../../uauth/interfaces';

export class AdminMrpcSdk {
  private backofficeGateway?: IBackofficeGateway;

  private uAuthGateway?: IUAuthGateway;

  public constructor(
    private readonly baseURL: string,
    private readonly uAuthURL: string,
  ) { }

  getBackofficeGateway(): IBackofficeGateway {
    this.backofficeGateway =
      this.backofficeGateway ||
      new BackofficeGateway({
        baseURL: this.baseURL,
        withCredentials: true,
      });

    return this.backofficeGateway;
  }

  getUAuthGateway(): IUAuthGateway {
    this.uAuthGateway =
      this.uAuthGateway ||
      new UAuthGateway({
        baseURL: this.uAuthURL,
        withCredentials: true,
      });

    return this.uAuthGateway;
  }
}
