import { TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider } from '@ankr.com/provider';
import { currentEnv, IWeb3TxInfoProps } from '@ankr.com/staking-sdk';

import { ZERO } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { IFetchTxData } from 'modules/switcher/api/types';

interface IGetTxDataProps extends IWeb3TxInfoProps<Web3KeyReadProvider> {
  env?: Env;
}

export const getTxData = async ({
  env = currentEnv,
  provider,
  txHash,
}: IGetTxDataProps): Promise<IFetchTxData> => {
  console.log(env);
  console.log(provider);
  console.log(txHash);
  return {
    amount: ZERO,
    isPending: false,
    destinationAddress: txHash,
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
