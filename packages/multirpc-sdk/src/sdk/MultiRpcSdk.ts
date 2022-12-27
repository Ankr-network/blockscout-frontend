import { AccountGateway } from '../account';
import { FetchBlockchainUrlsResult } from './types';
import { IBlockchainEntity } from '../backoffice';
import { IConfig } from '../common';
import { IPublicGateway, PublicGateway } from '../public';
import { OauthGateway } from '../oauth';
import { RpcGateway } from '../rpc/RpcGateway';
import { WorkerGateway } from '../worker';
import { formatPrivateUrls, formatPublicUrls } from './utils';

export class MultiRpcSdk {
  private publicGateway?: IPublicGateway;

  private oauthGateway?: OauthGateway;

  private accountGateway?: AccountGateway;

  private rpcGateway?: RpcGateway;

  private workerGateway?: WorkerGateway;

  public constructor(private readonly config: IConfig) {}

  public getRpcGateway(): RpcGateway {
    this.rpcGateway =
      this.rpcGateway ||
      new RpcGateway({
        baseURL: this.config.publicRpcUrl,
      });

    return this.rpcGateway;
  }

  public getPublicGateway(): IPublicGateway {
    this.publicGateway =
      this.publicGateway ||
      new PublicGateway({
        workerUrl: this.config.workerUrl,
        accountUrl: this.config.accountUrl,
      });

    return this.publicGateway;
  }

  public getWorkerGateway(): WorkerGateway {
    this.workerGateway =
      this.workerGateway ||
      new WorkerGateway({
        baseURL: this.config.workerUrl,
      });

    return this.workerGateway;
  }

  public getOauthGateway(): OauthGateway {
    this.oauthGateway =
      this.oauthGateway || new OauthGateway(this.config.accountUrl);

    return this.oauthGateway;
  }

  public getAccountGateway(): AccountGateway {
    this.accountGateway =
      this.accountGateway ||
      new AccountGateway({
        baseURL: this.config.accountUrl,
      });

    return this.accountGateway;
  }

  public formatPublicEndpoints(
    blockchains: IBlockchainEntity[],
  ): FetchBlockchainUrlsResult {
    return formatPublicUrls(blockchains, this.config.publicRpcUrl);
  }

  public formatPrivateEndpoints(
    blockchains: IBlockchainEntity[],
    userEndpointToken?: string,
  ): FetchBlockchainUrlsResult {
    return formatPrivateUrls(blockchains, this.config, userEndpointToken);
  }
}
