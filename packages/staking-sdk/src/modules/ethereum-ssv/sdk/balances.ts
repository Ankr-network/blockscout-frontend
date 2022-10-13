import BigNumber from 'bignumber.js';

import { Address } from '@ankr.com/provider';

import { currentEnv } from '../../common';
import { ICommonProps, IETHBalanceProps } from '../types';

import { getASETHCTokenContract } from './contracts';
import { getReadableAmountFromWei } from './utils';
import { Web3KeyReadProvider } from 'common';

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

  return getReadableAmountFromWei({
    amount,
    provider,
  });
};

export const getETHBalance = async ({
  address,
  provider,
}: IETHBalanceProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const web3 = provider.getWeb3();

  const amount = await web3.eth.getBalance(address);

  return getReadableAmountFromWei({
    amount,
    provider,
  });
};
