import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { IWeb3SendResult } from 'provider';

import { Token } from 'modules/common/types/token';

export interface IFetchTxData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export type IFetchTxReceiptData = TransactionReceipt | null;

export interface ShareArgs {
  amount: BigNumber;
}

export interface ISwitcher {
  getABBalance(isFormatted?: boolean): Promise<BigNumber>;
  getACBalance(isFormatted?: boolean): Promise<BigNumber>;
  getACRatio(isFormatted?: boolean): Promise<BigNumber>;
  getACAllowance(spender?: string): Promise<BigNumber>;
  fetchTxData(txHash: string): Promise<IFetchTxData>;
  fetchTxReceipt(txHash: string): Promise<IFetchTxReceiptData>;
  approveACForAB(amount?: BigNumber): Promise<IWeb3SendResult | undefined>;
  lockShares(data: ShareArgs): Promise<IWeb3SendResult>;
  unlockShares(data: ShareArgs): Promise<IWeb3SendResult>;
  addTokenToWallet(token: Token): Promise<boolean>;
}
