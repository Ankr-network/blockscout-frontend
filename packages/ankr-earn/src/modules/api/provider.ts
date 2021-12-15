import { PromiEvent, TransactionReceipt } from 'web3-core';

export interface ISendAsyncResult {
  receiptPromise: PromiEvent<TransactionReceipt>;
  transactionHash: string;
  rawTransaction: string;
}
