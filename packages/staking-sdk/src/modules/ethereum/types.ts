import { Web3KeyReadProvider, Web3KeyWriteProvider } from 'provider';

/**
 * Available tokens for EthereumSDK
 */
export type TEthToken = 'aETHb' | 'aETHc';

/**
 * Internal providers for EthereumSDK initializator
 */
export interface IEthSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}

/**
 * Ethereum pool contract events
 */
export enum EPoolEvents {
  StakeConfirmed = 'StakeConfirmed',
  StakePending = 'StakePending',
  RewardClaimed = 'RewardClaimed',
}

/**
 * Error codes for EthereumSDK
 */
export enum EEthereumErrorCodes {
  NOT_SUPPORTED = 'not-supported',
}
