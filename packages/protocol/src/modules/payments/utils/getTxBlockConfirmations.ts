import Web3 from 'web3';
import { Transaction } from 'web3-core';
import { t } from '@ankr.com/common';

export interface IGetTxBlockConfirmationsParams {
  web3: Web3;
  tx: Transaction;
}

export const getTxBlockConfirmations = async ({
  tx: initialTx,
  web3,
}: IGetTxBlockConfirmationsParams) => {
  const txHash = initialTx.hash;

  const tx = await web3.eth.getTransaction(txHash);

  // if transaction has turned to null it means that it was dropped or replaced
  if (!tx) {
    throw new Error(t('error.tx-replacement'));
  }

  const txReceipt = await web3.eth.getTransactionReceipt(txHash);

  if (!txReceipt) {
    return 0;
  }

  const latestBlock = await web3.eth.getBlock('latest');

  const confirmations = latestBlock.number - txReceipt.blockNumber;

  return confirmations;
};
