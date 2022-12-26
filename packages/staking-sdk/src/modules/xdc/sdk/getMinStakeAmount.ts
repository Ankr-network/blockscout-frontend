import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ICommonProps,
} from '../../common';

import { getXDCStakingPoolContract } from './contracts';

/**
 * Get minimum stake amount.
 *
 * @param {Env | undefined} [env = currentEnv] - current selected environment
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @returns {Promise<BigNumber>} - human-readable amount
 */
export const getMinStakeAmount = async ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const xdcStakingPoolContract = getXDCStakingPoolContract({
    env,
    provider,
  });

  const minStake: string = await xdcStakingPoolContract.methods
    .getMinStake()
    .call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount: minStake,
    provider,
  });
};
