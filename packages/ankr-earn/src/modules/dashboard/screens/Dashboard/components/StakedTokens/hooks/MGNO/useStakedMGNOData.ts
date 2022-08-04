import BigNumber from 'bignumber.js';

import { t } from 'common';

import { GNO_NETWORK_BY_ENV, ZERO } from 'modules/common/const';

export interface IStakedMGNOData {
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

export const useStakedMGNOData = (): IStakedMGNOData => {
  const network = t(`chain.${GNO_NETWORK_BY_ENV}`);
  const stakedAmount = ZERO;
  const rewardsAmount = ZERO;

  const stakedUsdEquivalent = ZERO;
  const rewardsUsdEquivalent = ZERO;

  const isShowed = !stakedAmount.isZero() || !rewardsAmount.isZero();

  return {
    stakedAmount,
    stakedUsdEquivalent,
    stakedTooltip: '',
    rewardsAmount,
    rewardsUsdEquivalent,
    rewardsTooltip: '',
    network,
    manageLink: ' ',
    isShowed,
  };
};
