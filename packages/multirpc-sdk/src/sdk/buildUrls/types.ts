import { IBlockchainEntity } from '../../common';

export interface BlockchainUrls {
  blockchain: IBlockchainEntity;
  rpcURLs: string[];
  wsURLs: string[];
  restURLs: string[];
  enterpriseURLs: string[];
  enterpriseWsURLs: string[];
}

type ChainId = string;

export type ChainsConfig = Record<ChainId, BlockchainUrls>;
