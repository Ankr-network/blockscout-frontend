import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';
import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ICommonProps,
} from '@ankr.com/staking-sdk';

import { featuresConfig, ZERO } from 'modules/common/const';

import { getAnkrSUITokenContract } from './contract';

export const getAnkrSUIRatio = async ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const ankrSUITokenContract = getAnkrSUITokenContract({
    env,
    provider,
  });

  if (featuresConfig.isSUIStakingActive) return ZERO;

  const ratio: string = await ankrSUITokenContract.methods.ratio().call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount: ratio,
    provider,
  });
};
