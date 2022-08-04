import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface ITrackStakeArgs {
  address?: string;
  walletType?: string;
  amount: BigNumber;
  willGetAmount: BigNumber;
  tokenIn: string;
  tokenOut: string;
  prevStakedAmount?: BigNumber;
  synthBalance: BigNumber;
}

interface IStakeTokensEvent extends IBaseWaletData {
  stakeToken: string;
  syntheticToken: string;
  stakeAmount: string;
  stakedBalance: string;
  syntheticAmount: string;
  syntheticBalance: string;
  addingStake: boolean;
  previousStake: string;
}

export const trackStake = async ({
  address,
  walletType,
  amount,
  willGetAmount,
  tokenIn,
  tokenOut,
  prevStakedAmount = ZERO,
  synthBalance,
}: ITrackStakeArgs): Promise<void> => {
  const stakeAmount = new BigNumber(amount);
  const isAddingStake = !prevStakedAmount.isZero();
  const stakedBalance = stakeAmount.plus(prevStakedAmount);

  const properties: IStakeTokensEvent = {
    walletType,
    walletPublicAddress: address,
    stakeToken: tokenIn,
    syntheticToken: tokenOut,
    syntheticAmount: willGetAmount.toFixed(),
    stakeAmount: amount.toFixed(),
    addingStake: isAddingStake,
    stakedBalance: stakedBalance.toFixed(),
    previousStake: isAddingStake
      ? stakedBalance.minus(stakeAmount).toFixed()
      : ZERO.toFixed(),
    syntheticBalance: synthBalance.toFixed(),
  };

  trackAnalyticEvent({ event: AnalyticsEvents.StakeTokens, properties });
};
