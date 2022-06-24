import BigNumber from 'bignumber.js';

import { t } from 'common';

import { ANKR_NETWORK_BY_ENV, ZERO } from 'modules/common/const';

export interface IStakedANKRData {
  stakedAmount: BigNumber;
  stakedUsdEquivalent: BigNumber;
  stakedTooltip: string;
  rewardsAmount: BigNumber;
  rewardsUsdEquivalent: BigNumber;
  rewardsTooltip: string;
  network: string;
  manageLink: string;
  isShowed: boolean;
}

export const useStakedANKRData = (): IStakedANKRData => {
  const network = t(`chain.${ANKR_NETWORK_BY_ENV}`);
  const stakedAmount = ZERO;
  const rewardsAmount = ZERO;

  const stakedUsdEquivalent = ZERO;
  const rewardsUsdEquivalent = ZERO;

  const isShowed = !stakedAmount.isZero() || !rewardsAmount.isZero();

  return {
    stakedAmount,
    stakedUsdEquivalent,
    stakedTooltip: 'stakedTooltip',
    rewardsAmount,
    rewardsUsdEquivalent,
    rewardsTooltip: 'rewardsTooltip',
    network,
    manageLink: '',
    isShowed,
  };
};
