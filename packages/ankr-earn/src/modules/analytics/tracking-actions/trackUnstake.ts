import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface ITrackUnstakeArgs {
  address?: string;
  name?: string;
  amount: BigNumber;
  stakeToken: Token;
  syntheticToken: Token;
  fee?: BigNumber;
  newTokenBalance: BigNumber;
  newStakedBalance: BigNumber;
  newSynthTokens: BigNumber;
}

interface IUnstakeTokensEvent extends IBaseWaletData {
  stakeToken: Token;
  syntheticToken: Token;
  unstakeAmount?: string;
  unstakeFee?: string;
  oldStakedBalance?: string;
  newStakedBalance?: string;
  syntheticAmount: string;
  oldSyntheticBalance: string;
  newSyntheticBalance: string;
}

export const trackUnstake = ({
  address,
  name,
  amount,
  stakeToken: tokenIn,
  syntheticToken: tokenOut,
  fee = ZERO,
  newTokenBalance,
  newStakedBalance,
  newSynthTokens,
}: ITrackUnstakeArgs): void => {
  const properties: IUnstakeTokensEvent = {
    walletType: name,
    walletPublicAddress: address,
    stakeToken: tokenIn,
    syntheticToken: tokenOut,
    unstakeFee: fee.toFixed(),
    syntheticAmount: amount.toFixed(),
    oldSyntheticBalance: newSynthTokens.plus(amount).toFixed(),
    newSyntheticBalance: newSynthTokens.toFixed(),
    unstakeAmount: newTokenBalance.toFixed(),
    oldStakedBalance: newStakedBalance.plus(amount).toFixed(),
    newStakedBalance: newStakedBalance.toFixed(),
  };

  trackAnalyticEvent({ event: AnalyticsEvents.UnstakeTokens, properties });
};
