/* istanbul ignore file */
// TODO: remove ignore when tests are ready
import { TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider, Web3KeyWriteProvider } from 'provider';

export type TBnbSyntToken = 'aBNBb' | 'aBNBc';

export enum EBinancePoolEvents {
  RatioUpdated = 'RatioUpdated',
  Staked = 'Staked',
  UnstakePending = 'UnstakePending',
  IsRebasing = 'isRebasing',
}

export enum EBinancePoolEventsMap {
  Staked = 'STAKE_ACTION_STAKED',
  UnstakePending = 'STAKE_ACTION_UNSTAKED',
}

export interface IGetTxReceipt extends TransactionReceipt {
  certAmount?: string;
}

export interface IBinanceSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}
