import { Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import { currentEnv } from '../../common';
import { ICommonProps } from '../types';

import { getASETHCTokenContract } from './contracts';
import { getReadableAmountFromWei } from './utils';

export const getASETHCRatio = async ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const asETHcTokenContract = getASETHCTokenContract({
    env,
    provider,
  });

  const ratio: string = await asETHcTokenContract.methods.ratio().call();

  return getReadableAmountFromWei({
    amount: ratio,
    provider,
  });
};
