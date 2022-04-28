import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { useNetworks } from 'modules/auth/common/components/GuardRoute/useNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake } from 'modules/stake-polygon/actions/stake';
import { MATIC_STAKING_NETWORKS } from 'modules/stake-polygon/const';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { IUseStakableToken } from '../types';

export const useStakableMatic = (): IUseStakableToken => {
  const networks = useNetworks();
  const { data, loading: loadingStats } = useQuery({
    type: fetchStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { data: apy, loading: loadingAPY } = useQuery({ type: fetchAPY });

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        MATIC_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const balance = data?.maticBalance ?? ZERO;

  return {
    icon: <MaticIcon />,
    token: Token.MATIC,
    href: StakePolygonRoutes.stake.generatePath(),
    apy: apy?.toNumber() ?? 0,
    balance,
    networks: networksData,
    isLoading: loadingStats || loadingAPY,
    isStakeLoading,
    isShowed: !balance.isZero(),
  };
};
