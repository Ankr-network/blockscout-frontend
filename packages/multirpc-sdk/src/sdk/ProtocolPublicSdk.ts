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

  async getPublicUrls(): Promise<FetchBlockchainUrlsResult> {
    const blockchainsApiResponse = await this.getGateway().getBlockchains();

    return formatPublicUrls(blockchainsApiResponse, this.config.publicRpcUrl);
  }
}
