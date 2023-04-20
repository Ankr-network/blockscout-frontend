import { IBlockchainEntity } from '../backoffice';

export interface BlockchainUrls {
  blockchain: IBlockchainEntity;
  restURLs: string[];
  rpcURLs: string[];
  wsURLs: string[];
}

export type FetchBlockchainUrlsResult = Record<string, BlockchainUrls>;
