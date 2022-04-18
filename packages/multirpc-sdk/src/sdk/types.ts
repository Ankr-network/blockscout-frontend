import { Base64, IJwtToken, PrefixedHex, UUID, Web3Address } from '../common';
import { IBlockchainEntity } from '../worker';
import { IManagedPromise } from '../stepper';

export interface BlockchainUrls {
  blockchain: IBlockchainEntity;
  rpcURLs: string[];
  wsURLs: string[];
}

export interface IIsJwtTokenIssueAvailableResult {
  isReady: boolean;
  remainingBlocks?: number;
}

export type FetchBlockchainUrlsResult = Record<string, BlockchainUrls>;

export interface ILoginAsUserExState {
  currentAccount?: Web3Address;
  encryptionKey?: Base64;
  thresholdKey?: UUID;
  transactionHash?: PrefixedHex;
}

export type LoginAsUserExResult =
  IManagedPromise<IJwtToken | false, LoginAsUserExResultAction>;

export type LoginAsUserExResultAction =
  'get_user_info' | 'get_encryption_key' | 'decrypt_jwt_token';