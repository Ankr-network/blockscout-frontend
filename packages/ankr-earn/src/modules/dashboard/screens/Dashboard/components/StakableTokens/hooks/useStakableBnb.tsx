import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { useETHNetworks } from 'modules/auth/eth/hooks/useETHNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import { stake } from 'modules/stake-bnb/actions/stake';
import { BNB_STAKING_NETWORKS } from 'modules/stake-bnb/const';
import { RoutesConfig as StakeBinanceRoutes } from 'modules/stake-bnb/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';

import { IUseStakableToken } from '../types';

export const useStakableBnb = (): IUseStakableToken => {
  const networks = useETHNetworks();

  const { data: metrics, loading: isLoadingAPY } = useQuery({
    type: getMetrics,
  });

  const { data, loading } = useQuery({
    type: fetchStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });
  const apy = metrics ? +metrics.bnb.apy : 0;

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        BNB_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const balance = data?.bnbBalance ?? ZERO;

  return {
    icon: <BNBIcon />,
    token: Token.BNB,
    href: StakeBinanceRoutes.stake.generatePath(),
    apy,
    balance,
    networks: networksData,
    isLoading: loading || isLoadingAPY,
    isStakeLoading,
    isShowed: !balance.isZero(),
  };
};
