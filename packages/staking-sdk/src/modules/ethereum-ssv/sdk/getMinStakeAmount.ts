import { Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ICommonProps,
} from '../../common';

import { getSSVStakingPoolContract } from './contracts';

export const getMinStakeAmount = async ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const ssvStakingPoolContract = getSSVStakingPoolContract({
    env,
    provider,
  });

  const minStake: string = await ssvStakingPoolContract.methods
    .getMinStake()
    .call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount: minStake,
    provider,
  });
};
