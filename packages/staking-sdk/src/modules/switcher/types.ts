import BigNumber from 'bignumber.js';

/**
 * Transaction information
 */
export interface IFetchTxData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

/**
 * Shares args
 */
export interface IShareArgs {
  amount: BigNumber;
  scale?: number;
}
