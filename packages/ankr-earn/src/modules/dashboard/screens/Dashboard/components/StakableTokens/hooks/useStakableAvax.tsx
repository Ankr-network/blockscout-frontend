import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import {
  IETHNetwork,
  useETHNetworks,
} from 'modules/auth/eth/hooks/useETHNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchStats } from 'modules/stake-avax/actions/fetchStats';
import { stake } from 'modules/stake-avax/actions/stake';
import { AVAX_STAKING_NETWORKS } from 'modules/stake-avax/const';
import { RoutesConfig as StakeAvalancheRoutes } from 'modules/stake-avax/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';

import { IUseStakableToken } from '../types';

export const useStakableAvax = (): IUseStakableToken<IETHNetwork> => {
  const networks = useETHNetworks();

  const { data: metrics, loading: isLoadingAPY } = useQuery({
    type: getMetrics,
  });

  const { data, loading } = useQuery({
    type: fetchStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });
  const apy = metrics ? +metrics.avax.apy : 0;

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        AVAX_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const balance = data?.avaxBalance ?? ZERO;

  return {
    icon: <AvaxIcon />,
    token: Token.AVAX,
    href: StakeAvalancheRoutes.stake.generatePath(),
    apy,
    balance,
    networks: networksData,
    isLoading: loading || isLoadingAPY,
    isStakeLoading,
    isShowed: !balance.isZero(),
  };
};
