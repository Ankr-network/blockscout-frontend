import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { ISwitcher } from '@ankr.com/staking-sdk';

import { AvailableSwitchNetwork, AvailableSwitcherToken } from '../const';

export interface ISwitcherSDKArgs {
  binanceSDK: ISwitcher;
  ethSDK: ISwitcher;
  maticSDK: ISwitcher;
  fantomSDK: ISwitcher;
  avaxSDK: ISwitcher;
  account: string;
}

export interface ISwitcherCommonDataArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
}

export interface ISwitcherCommonData {
  acBalance: BigNumber;
  abBalance: BigNumber;
  ratio: BigNumber;
  allowance: BigNumber;
}

export interface IFetchTxDataArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
  txHash: string;
}

export interface IFetchTxData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export interface IFetchTxReceiptArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
  txHash: string;
}

export type IFetchTxReceiptData = TransactionReceipt | null;

export interface ISwitcherApproveArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
  amount?: BigNumber;
}

export interface ISwitcherLockSharesArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
  amount: BigNumber;
}

export interface ISwitcherUnlockSharesArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
  amount: BigNumber;
  ratio: BigNumber;
}

export interface IAddTokenToWalletArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
}
