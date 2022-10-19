import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ANKR_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

export interface IStakedANKRData {
  stakedAmount: BigNumber;
  rewardsAmount: BigNumber;
  stakedUsdEquivalent: BigNumber;
  rewardsUsdEquivalent: BigNumber;
  stakedTooltip: string;
  network: string;
  manageLink: string;
  loading: boolean;
  address?: string;
  walletName?: string;
}

export const useStakedANKRData = (): IStakedANKRData => {
  const { data, loading } = useQuery({ type: getTotalInfo });
  const { data: ankrPrice } = useQuery({ type: getANKRPrice });
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const network = t(`chain.${ANKR_NETWORK_BY_ENV}`);
  const stakedAmount = data?.totalDelegatedAmount ?? ZERO;
  const rewardsAmount =
    data?.claimableRewards.reduce(
      (acc, { amount }) => acc.plus(amount),
      ZERO,
    ) ?? ZERO;

  const usdPrice = ankrPrice ?? ZERO;
  const stakedUsdEquivalent = stakedAmount.multipliedBy(usdPrice);
  const rewardsUsdEquivalent = rewardsAmount.multipliedBy(usdPrice);

  return {
    stakedAmount,
    rewardsAmount,
    stakedUsdEquivalent,
    rewardsUsdEquivalent,
    stakedTooltip: '',
    network,
    manageLink: RoutesConfig.main.generatePath(),
    loading,
    address,
    walletName,
  };
};
