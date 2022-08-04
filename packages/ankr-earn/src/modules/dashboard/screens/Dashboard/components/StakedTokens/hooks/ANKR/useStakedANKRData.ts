import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { ANKR_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { getTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

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
  loading: boolean;
}

export const useStakedANKRData = (): IStakedANKRData => {
  const { data, loading } = useQuery({ type: getTotalInfo });

  const network = t(`chain.${ANKR_NETWORK_BY_ENV}`);
  const stakedAmount = data?.totalDelegatedAmount ?? ZERO;
  const rewardsAmount =
    data?.claimableRewards.reduce((acc, reward) => {
      acc.plus(reward.amount);
      return acc;
    }, ZERO) ?? ZERO;

  const stakedUsdEquivalent = ZERO;
  const rewardsUsdEquivalent = ZERO;

  const isShowed = loading || !stakedAmount.isZero() || !rewardsAmount.isZero();

  return {
    stakedAmount,
    stakedUsdEquivalent,
    stakedTooltip: '',
    rewardsAmount,
    rewardsUsdEquivalent,
    rewardsTooltip: '',
    network,
    manageLink: RoutesConfig.main.generatePath(),
    isShowed,
    loading,
  };
};
