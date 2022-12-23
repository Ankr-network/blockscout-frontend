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
