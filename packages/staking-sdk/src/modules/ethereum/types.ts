import { Web3KeyReadProvider, Web3KeyWriteProvider } from 'provider';

export type TEthToken = 'aETHb' | 'aETHc';

export interface IEthSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}

export enum EPoolEvents {
  StakeConfirmed = 'StakeConfirmed',
  StakePending = 'StakePending',
  RewardClaimed = 'RewardClaimed',
}
