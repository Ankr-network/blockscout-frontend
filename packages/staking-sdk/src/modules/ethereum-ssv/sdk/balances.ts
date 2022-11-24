import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ITokenBalanceProps,
  IWeb3BalanceProps,
} from '../../common';

import { getASETHCTokenContract } from './contracts';

export const getASETHCBalance = async ({
  address,
  env = currentEnv,
  provider,
}: ITokenBalanceProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const asETHcTokenContract = getASETHCTokenContract({
    env,
    provider,
  });

  const amount: string = await asETHcTokenContract.methods
    .balanceOf(address)
    .call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount,
    provider,
  });
};

export const getETHBalance = async ({
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
