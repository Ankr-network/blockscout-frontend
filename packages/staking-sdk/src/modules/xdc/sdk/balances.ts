import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ITokenBalanceProps,
  IWeb3BalanceProps,
} from '../../common';

import { getAnkrXDCTokenContract } from './contracts';

export const getAnkrXDCBalance = async ({
  address,
  env = currentEnv,
  provider,
}: ITokenBalanceProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const ankrXDCTokenContract = getAnkrXDCTokenContract({
    env,
    provider,
  });

  const amount: string = await ankrXDCTokenContract.methods
    .balanceOf(address)
    .call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount,
    provider,
  });
};

export const getXDCBalance = async ({
  address,
  provider,
}: IWeb3BalanceProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const web3 = provider.getWeb3();

  const amount = await web3.eth.getBalance(address);

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount,
    provider,
  });
};
