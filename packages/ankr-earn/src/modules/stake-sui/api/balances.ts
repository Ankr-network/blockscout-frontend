import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';
import {
  currentEnv,
  getWeb3ReadableAmountFromWei,
  ITokenBalanceProps,
} from '@ankr.com/staking-sdk';

import { featuresConfig, ZERO } from 'modules/common/const';

import { getAnkrSUITokenContract } from './contract';

export const getSUIBalance = async (): Promise<BigNumber> => {
  return ZERO;
};

export const getAnkrSUIBalance = async ({
  address,
  env = currentEnv,
  provider,
}: ITokenBalanceProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const ankrSUITokenContract = getAnkrSUITokenContract({
    env,
    provider,
  });

  if (featuresConfig.isSUIStakingActive) return ZERO;

  const amount: string = await ankrSUITokenContract.methods
    .balanceOf(address)
    .call();

  return getWeb3ReadableAmountFromWei<Web3KeyReadProvider>({
    amount,
    provider,
  });
};
