import { TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider } from '@ankr.com/provider';
import { IWeb3TxInfoProps } from '@ankr.com/staking-sdk';

import { ZERO } from 'modules/common/const';
import { IFetchTxData } from 'modules/switcher/api/types';

export const getTxData = async (): Promise<IFetchTxData> => {
  return {
    amount: ZERO,
    isPending: false,
    destinationAddress: ' ',
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
