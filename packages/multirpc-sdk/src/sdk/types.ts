import { IBlockchainEntity } from '../backoffice';

export interface BlockchainUrls {
  blockchain: IBlockchainEntity;
  rpcURLs: string[];
  wsURLs: string[];
}

export type FetchBlockchainUrlsResult = Record<string, BlockchainUrls>;
