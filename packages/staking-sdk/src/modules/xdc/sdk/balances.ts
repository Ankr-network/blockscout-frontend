import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ITokenBalanceProps,
  IWeb3BalanceProps,
} from '../../common';

import { getAnkrXDCTokenContract } from './contracts';

/**
 * Get ankrXDC token balance.
 *
 * @param {string} address - current user address
 * @param {Env | undefined} [env = currentEnv] - current selected environment
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @returns {Promise<BigNumber>} - human-readable balance
 */
export const getAnkrXDCBalance = async ({
  address,
  env = currentEnv,
  provider,
}: ITokenBalanceProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const ankrXDCTokenContract = getAnkrXDCTokenContract({
    env,
    provider,
  });

  const amount: string = await ankrXDCTokenContract.methods
    .balanceOf(address)
    .call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount,
    provider,
  });
};

/**
 * Get XDC token balance.
 *
 * @param {string} address - current user address
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @returns {Promise<BigNumber>} - human-readable balance
 */
export const getXDCBalance = async ({
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
