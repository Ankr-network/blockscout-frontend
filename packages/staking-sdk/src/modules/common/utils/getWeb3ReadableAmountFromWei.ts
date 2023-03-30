import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { IWeb3ReadableAmountFromWeiProps } from '../types';

/**
 * Get human-readable amount from Wei.
 *
 * @param {string} amount - target amount
 * @param {Provider} provider - current selected provider
 * @returns {BigNumber}
 */
export const getWeb3ReadableAmountFromWei = <
  Provider extends Web3KeyReadProvider,
>({
  amount,
  provider,
}: IWeb3ReadableAmountFromWeiProps<Provider>): BigNumber => {
  const web3 = provider.getWeb3();

  return new BigNumber(web3.utils.fromWei(amount));
};
