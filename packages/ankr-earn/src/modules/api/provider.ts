import { PromiEvent, TransactionReceipt } from 'web3-core';
import { BlockchainNetworkId } from 'modules/common/types';

export interface ISendAsyncResult {
  receiptPromise: PromiEvent<TransactionReceipt>;
  transactionHash: string;
  rawTransaction: string;
}

export interface IConnectResult {
  chainId: BlockchainNetworkId;
}
