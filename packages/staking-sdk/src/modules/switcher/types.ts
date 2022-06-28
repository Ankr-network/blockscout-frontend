import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

/**
 * Transaction information
 */
export interface IFetchTxData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

/**
 * Transaction receipt
 */
export type IFetchTxReceiptData = TransactionReceipt | null;

/**
 * Shares args
 */
export interface IShareArgs {
  amount: BigNumber;
  scale?: number;
}
