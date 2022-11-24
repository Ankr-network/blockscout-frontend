import { Web3KeyReadProvider } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { IWeb3TxInfoProps } from '../../common';
import { IFetchTxData } from '../../switcher';

export const getTxData = async ({
  provider,
  txHash,
}: IWeb3TxInfoProps<Web3KeyReadProvider>): Promise<IFetchTxData> => {
  const web3 = provider.getWeb3();

  const tx = await web3.eth.getTransaction(txHash);

  const { 1: amount } =
    tx.value === '0'
      ? web3.eth.abi.decodeParameters(['bool', 'uint256'], tx.input.slice(10))
      : { 1: tx.value };

  return {
    amount: new BigNumber(web3.utils.fromWei(amount)),
    destinationAddress: tx.from as string | undefined,
    isPending: tx.transactionIndex === null,
  };
};

export const getTxReceipt = async ({
  provider,
  txHash,
}: IWeb3TxInfoProps<Web3KeyReadProvider>): Promise<TransactionReceipt | null> => {
  const web3 = provider.getWeb3();

  const receipt = await web3.eth.getTransactionReceipt(txHash);

  return receipt as TransactionReceipt | null;
};
