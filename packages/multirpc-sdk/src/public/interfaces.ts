import { IBlockchainEntity, INodeEntity } from '../backoffice';
import {
  IRate,
  IWorkerGlobalStatus,
  IWorkerNodesWeight,
  IWorkerPublicStats,
  Timeframe,
} from './types';

export interface IPublicGateway {
  getBlockchains(): Promise<IBlockchainEntity[]>;

  getNodes(blockchain?: string): Promise<INodeEntity[]>;

  getTimeframeStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus>;

  getPublicTimeframesStats(timeframe: Timeframe): Promise<IWorkerPublicStats>;

  getNodesWeight(): Promise<IWorkerNodesWeight[]>;

  getRate(): Promise<IRate>;
}
