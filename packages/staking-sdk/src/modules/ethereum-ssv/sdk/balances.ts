import { Address, Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import { currentEnv, ICommonProps, IETHBalanceProps } from '../../common';

import { getASETHCTokenContract } from './contracts';
import { getReadableAmountFromWei } from './utils';

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
