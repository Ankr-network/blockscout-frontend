import { IBlockchainEntity, INodeEntity } from '../backoffice';
import { IWorkerGlobalStatus, IWorkerNodesWeight, Timeframe } from './types';

export interface IPublicGateway {
  getBlockchains(): Promise<IBlockchainEntity[]>;

  getNodes(blockchain?: string): Promise<INodeEntity[]>;

  getTimeframeStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus>;

  getNodesWeight(): Promise<IWorkerNodesWeight[]>;
}
