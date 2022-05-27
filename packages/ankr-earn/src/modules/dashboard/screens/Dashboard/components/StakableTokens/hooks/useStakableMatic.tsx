import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { useETHNetworks } from 'modules/auth/eth/hooks/useETHNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake } from 'modules/stake-polygon/actions/stake';
import { MATIC_STAKING_NETWORKS } from 'modules/stake-polygon/const';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { IUseStakableToken } from '../types';

export const useStakableMatic = (): IUseStakableToken => {
  const networks = useETHNetworks();
  const { data, loading: loadingStats } = useQuery({
    type: fetchStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { data: metrics, loading: loadingAPY } = useQuery({ type: getMetrics });

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        MATIC_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const apy = metrics ? +metrics.matic.apy : 0;
  const balance = data?.maticBalance ?? ZERO;

  return {
    icon: <MaticIcon />,
    token: Token.MATIC,
    href: StakePolygonRoutes.stake.generatePath(),
    apy,
    balance,
    networks: networksData,
    isLoading: loadingStats || loadingAPY,
    isStakeLoading,
    isShowed: !balance.isZero(),
  };
};
