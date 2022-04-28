import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { EthSDK } from 'modules/api/EthSDK';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';

import { AvailableSwitchNetwork, AvailableSwitcherToken } from '../const';

export interface ISwitcherSDKArgs {
  binanceSDK: BinanceSDK;
  ethSDK: EthSDK;
  account: string;
}

export interface ISwitcherCommonDataArgs {
  chainId: AvailableSwitchNetwork;
}

export interface ISwitcherCommonData {
  acBalance: BigNumber;
  abBalance: BigNumber;
  ratio: BigNumber;
  allowance: BigNumber;
}

export interface IFetchTxDataArgs {
  chainId: AvailableSwitchNetwork;
  txHash: string;
}

export interface IFetchTxData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export interface IFetchTxReceiptArgs {
  chainId: AvailableSwitchNetwork;
  txHash: string;
}

export type IFetchTxReceiptData = TransactionReceipt | null;

export interface ISwitcherApproveArgs {
  chainId: AvailableSwitchNetwork;
  amount?: BigNumber;
}

export interface ISwitcherLockSharesArgs {
  chainId: AvailableSwitchNetwork;
  amount: BigNumber;
}

export interface ISwitcherUnlockSharesArgs {
  chainId: AvailableSwitchNetwork;
  amount: BigNumber;
  ratio: BigNumber;
}

export interface IAddTokenToWalletArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
}
