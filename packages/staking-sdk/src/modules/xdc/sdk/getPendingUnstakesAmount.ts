import BigNumber from 'bignumber.js';

import { Address, Web3KeyReadProvider } from '@ankr.com/provider';

import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ICommonProps,
} from '../../common';

import { getXDCStakingPoolContract } from './contracts';

interface IGetPendingUnstakesAmountProps
  extends ICommonProps<Web3KeyReadProvider> {
  address: Address;
}

/**
 * Get total pending unstakes amount.
 *
 * @param {string} address - current user address
 * @param {Env | undefined} [env = currentEnv] - current selected environment
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @returns {Promise<BigNumber>} - human-readable amount
 */
export const getPendingUnstakesAmount = async ({
  address,
  env = currentEnv,
  provider,
}: IGetPendingUnstakesAmountProps): Promise<BigNumber> => {
  const xdcStakingPoolContract = getXDCStakingPoolContract({
    env,
    provider,
  });

  const pendingUnstakesAmount: string = await xdcStakingPoolContract.methods
    .getPendingUnstakesOf(address)
    .call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount: pendingUnstakesAmount,
    provider,
  });
};
