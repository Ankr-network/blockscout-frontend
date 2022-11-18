import { Web3KeyReadProvider } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';

import { IWeb3ReadableAmountFromWeiProps } from './types';

export const getWeb3ReadableAmountFromWei = <
  Provider extends Web3KeyReadProvider,
>({
  amount,
  provider,
}: IWeb3ReadableAmountFromWeiProps<Provider>): BigNumber => {
  const web3 = provider.getWeb3();

  return new BigNumber(web3.utils.fromWei(amount));
};
