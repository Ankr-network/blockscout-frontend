import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { IWeb3SendResult } from 'provider';

export interface IFetchTxData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export type IFetchTxReceiptData = TransactionReceipt | null;

export interface IShareArgs {
  amount: BigNumber;
}

export interface ISwitcher {
  getABBalance(isFormatted?: boolean): Promise<BigNumber>;
  getACBalance(isFormatted?: boolean): Promise<BigNumber>;
  getACRatio(isFormatted?: boolean): Promise<BigNumber>;
  getACAllowance(spender?: string): Promise<BigNumber>;
  fetchTxData(txHash: string): Promise<IFetchTxData>;
  fetchTxReceipt(txHash: string): Promise<IFetchTxReceiptData>;
  approveACForAB(
    amount?: BigNumber,
    scale?: BigNumber.Value,
  ): Promise<IWeb3SendResult | undefined>;
  lockShares(data: IShareArgs): Promise<IWeb3SendResult>;
  unlockShares(data: IShareArgs): Promise<IWeb3SendResult>;
  addTokenToWallet(token: string): Promise<boolean>;
}
