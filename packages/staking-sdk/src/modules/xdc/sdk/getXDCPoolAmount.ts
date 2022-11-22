import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ICommonProps,
} from '../../common';

import { getXDCStakingPoolContract } from './contracts';

export const getXDCPoolAmount = async ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const xdcStakingPoolContract = getXDCStakingPoolContract({
    env,
    provider,
  });

  const amount: string = await xdcStakingPoolContract.methods
    .getFreeBalance()
    .call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount,
    provider,
  });
};
