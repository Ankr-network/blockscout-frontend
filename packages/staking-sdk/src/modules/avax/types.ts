import { Web3KeyReadProvider, Web3KeyWriteProvider } from '@ankr.com/provider';

export enum EAvalanchePoolEvents {
  AvaxClaimPending = 'AvaxClaimPendingV2',
  StakePending = 'StakePendingV2',
}

export enum EAvalanchePoolEventsMap {
  AvaxClaimPending = 'STAKE_ACTION_UNSTAKED',
  StakePending = 'STAKE_ACTION_STAKED',
}

export interface IAvalancheSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}
