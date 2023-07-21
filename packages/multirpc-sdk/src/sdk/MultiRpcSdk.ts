import { AccountGateway } from '../account';
import { ChainsConfig } from './buildUrls/types';
import { IConfig, IBlockchainEntity } from '../common';
import {
  IPublicGateway,
  PublicGateway,
  StandalonePublicGateway,
} from '../public';
import { EnterpriseGateway } from '../enterprise';
import { OauthGateway } from '../oauth';
import { RpcGateway } from '../rpc';
import { WorkerGateway } from '../worker';
import { buildPrivateUrls, buildPublicUrls } from './buildUrls';

export class MultiRpcSdk {
  private publicGateway?: IPublicGateway;

  private oauthGateway?: OauthGateway;

  private accountGateway?: AccountGateway;

  private enterpriseGateway?: EnterpriseGateway;

  private rpcGateway?: RpcGateway;

  private workerGateway?: WorkerGateway;

  private standalonePublicGateway?: StandalonePublicGateway;

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

  public getStandalonePublicGateway(baseUrl: string): StandalonePublicGateway {
    this.standalonePublicGateway =
      this.standalonePublicGateway || new StandalonePublicGateway(baseUrl);

    return this.standalonePublicGateway;
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

  public getEnterpriseGateway(): EnterpriseGateway {
    this.enterpriseGateway =
      this.enterpriseGateway ||
      new EnterpriseGateway({
        baseURL: this.config.accountUrl,
      });

    return this.enterpriseGateway;
  }

  public formatPublicEndpoints(blockchains: IBlockchainEntity[]): ChainsConfig {
    const { publicRpcUrl } = this.config;

    return buildPublicUrls(blockchains, publicRpcUrl);
  }

  public formatPrivateEndpoints(
    blockchains: IBlockchainEntity[],
    userEndpointToken?: string,
  ): ChainsConfig {
    const { privateRpcUrl, privateWsUrl } = this.config;

    return buildPrivateUrls({
      blockchains,
      privateRpcUrl,
      privateWsUrl,
      userEndpointToken,
    });
  }
}
