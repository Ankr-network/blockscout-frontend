import { Address, Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ICommonProps,
  IWeb3BalanceProps,
} from '../../common';

import { getASETHCTokenContract } from './contracts';

interface IBalanceProps extends ICommonProps<Web3KeyReadProvider> {
  address: Address;
}

export const getASETHCBalance = async ({
  address,
  env = currentEnv,
  provider,
}: IBalanceProps): Promise<BigNumber> => {
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
