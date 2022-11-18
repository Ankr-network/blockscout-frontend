import { Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ICommonProps,
} from '../../common';

import { getASETHCTokenContract } from './contracts';

export const getASETHCRatio = async ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const asETHcTokenContract = getASETHCTokenContract({
    env,
    provider,
  });

  const ratio: string = await asETHcTokenContract.methods.ratio().call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount: ratio,
    provider,
  });
};
