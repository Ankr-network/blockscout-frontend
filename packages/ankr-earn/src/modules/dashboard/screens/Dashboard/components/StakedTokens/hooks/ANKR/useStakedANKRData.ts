import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { ANKR_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

export interface IStakedANKRData {
  stakedAmount: BigNumber;
  stakedUsdEquivalent: BigNumber;
  stakedTooltip: string;
  network: string;
  manageLink: string;
  isShowed: boolean;
  loading: boolean;
}

export const useStakedANKRData = (): IStakedANKRData => {
  const { data, loading } = useQuery({ type: getTotalInfo });
  const { data: ankrPrice } = useQuery({ type: getANKRPrice });

  const network = t(`chain.${ANKR_NETWORK_BY_ENV}`);
  const stakedAmount = data?.totalDelegatedAmount ?? ZERO;

  const usdPrice = ankrPrice ?? ZERO;
  const stakedUsdEquivalent = stakedAmount.multipliedBy(usdPrice);

  const isShowed = loading || !stakedAmount.isZero();

  return {
    stakedAmount,
    stakedUsdEquivalent,
    stakedTooltip: '',
    network,
    manageLink: RoutesConfig.main.generatePath(),
    isShowed,
    loading,
  };
};
