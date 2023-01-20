import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ICommonProps,
} from '../../common';

import { getAnkrXDCTokenContract } from './contracts';

/**
 * Get ankrXDC ratio.
 *
 * @param {Env | undefined} [env = currentEnv] - current selected environment
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @returns {Promise<BigNumber>} - human-readable ratio
 */
export const getAnkrXDCRatio = async ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const ankrXDCTokenContract = getAnkrXDCTokenContract({
    env,
    provider,
  });

  const ratio: string = await ankrXDCTokenContract.methods.ratio().call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount: ratio,
    provider,
  });
};
