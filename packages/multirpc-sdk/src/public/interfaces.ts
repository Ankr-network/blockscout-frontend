import { IBlockchainEntity, INodeEntity } from '../backoffice';
import {
  IRate,
  IWorkerGlobalStatus,
  IWorkerPublicStats,
  Timeframe,
  INodesDetailEntity,
  IWorkerNodesWeight,
} from './types';

export interface IPublicGateway {
  getBlockchains(): Promise<IBlockchainEntity[]>;

  getNodesDetail(): Promise<INodesDetailEntity[]>;

  getStandaloneNodes(url?: string): Promise<INodeEntity[]>;

  getStandaloneNodesWeight(url?: string): Promise<IWorkerNodesWeight[]>;

  getTimeframeStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus>;

  getPublicTimeframesStats(timeframe: Timeframe): Promise<IWorkerPublicStats>;

  getRate(): Promise<IRate>;
}
