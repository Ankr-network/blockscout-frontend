import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ICommonProps,
} from '../../common';

import { getAXDCCTokenContract } from './contracts';

export const getAXDCCRatio = async ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const aXDCcTokenContract = getAXDCCTokenContract({
    env,
    provider,
  });

  const ratio: string = await aXDCcTokenContract.methods.ratio().call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount: ratio,
    provider,
  });
};
