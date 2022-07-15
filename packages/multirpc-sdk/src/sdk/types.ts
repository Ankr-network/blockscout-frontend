import { IBlockchainEntity } from '../backoffice';

export interface BlockchainUrls {
  blockchain: IBlockchainEntity;
  rpcURLs: string[];
  wsURLs: string[];
}

export interface IIssueJwtTokenResult {
  isReady: boolean;
  remainingBlocks?: number;
}

export type FetchBlockchainUrlsResult = Record<string, BlockchainUrls>;
