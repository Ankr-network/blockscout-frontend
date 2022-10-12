import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { currentEnv } from '../../common';
import { ICommonProps } from '../types';

import { getSSVStakingPoolContract } from './contracts';
import { getReadableAmountFromWei } from './utils';

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

  return getReadableAmountFromWei({
    amount: minStake,
    provider,
  });
};
