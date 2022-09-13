import { IBlockchainEntity } from '../backoffice';
import { IConfig } from '../common';
import { IPublicGateway, PublicGateway, Timeframe } from '../public';
import { IProtocolPublicSdk } from './interfaces';
import { FetchBlockchainUrlsResult } from './types';
import { formatPublicUrls } from './utils';

export class ProtocolPublicSdk implements IProtocolPublicSdk {
  private publicGateway?: IPublicGateway;

  public constructor(private readonly config: IConfig) {}

  getGateway(): IPublicGateway {
    this.publicGateway =
      this.publicGateway ||
      new PublicGateway({
        baseURL: this.config.workerUrl,
      });

    return this.publicGateway;
  }

  async getBlockchains() {
    return this.getGateway().getBlockchains();
  }

  async getNodes(blockchain?: string) {
    return this.getGateway().getNodes(blockchain);
  }

  async getTimeframeStats(blockchain: string, timeframe: Timeframe) {
    return this.getGateway().getTimeframeStats(blockchain, timeframe);
  }

  async getNodesWeight() {
    return this.getGateway().getNodesWeight();
  }

  async formatPublicChains(
    blockchains: IBlockchainEntity[],
  ): Promise<FetchBlockchainUrlsResult> {
    return formatPublicUrls(blockchains, this.config.publicRpcUrl);
  }
}
