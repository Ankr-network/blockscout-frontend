import { ChainsConfig, IBlockchainEntity } from '@ankr.com/chains-list';

import { AccountingGateway } from '../accounting';
import { IConfig } from '../common';
import {
  IPublicGateway,
  PublicGateway,
  StandalonePublicGateway,
} from '../public';
import { EnterpriseGateway } from '../enterprise';
import { RpcGateway } from '../rpc';
import { WorkerGateway } from '../worker';
import { buildPrivateUrls, buildPublicUrls } from './buildUrls';

export class MultiRpcSdk {
  private publicGateway?: IPublicGateway;

  private accountingGateway?: AccountingGateway;

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

  public getAccountingGateway(): AccountingGateway {
    this.accountingGateway =
      this.accountingGateway ||
      new AccountingGateway({
        baseURL: this.config.accountUrl,
      });

    return this.accountingGateway;
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
    const { publicRpcUrl, publicEnterpriseRpcUrl, enterpriseWsUrl } =
      this.config;

    return buildPublicUrls({
      blockchainsApiResponse: blockchains,
      publicRpcUrl,
      publicEnterpriseRpcUrl,
      enterpriseWsUrl,
    });
  }

  public formatPrivateEndpoints(
    blockchains: IBlockchainEntity[],
    userEndpointToken?: string,
  ): ChainsConfig {
    const { privateRpcUrl, privateWsUrl, enterpriseRpcUrl, enterpriseWsUrl } =
      this.config;

    return buildPrivateUrls({
      blockchains,
      privateRpcUrl,
      privateWsUrl,
      userEndpointToken,
      enterpriseRpcUrl,
      enterpriseWsUrl,
    });
  }
}
