import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import {
  IETHNetwork,
  useETHNetworks,
} from 'modules/auth/eth/hooks/useETHNetworks';
import { featuresConfig, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { MATIC_ON_ETH_STAKING_NETWORKS } from 'modules/stake-matic/common/const';
import { RoutesConfig as StakeMaticCommonRoutes } from 'modules/stake-matic/common/Routes';
import { fetchStats } from 'modules/stake-matic/eth/actions/fetchStats';
import { stake } from 'modules/stake-matic/eth/actions/stake';
import { RoutesConfig as StakeMaticEthRoutes } from 'modules/stake-matic/eth/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { IUseStakableToken } from '../types';

export const useStakableMatic = (): IUseStakableToken<IETHNetwork> => {
  const networks = useETHNetworks();
  const { data, loading: loadingStats } = useQuery({
    type: fetchStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { data: metrics, loading: loadingAPY } = useQuery({ type: getMetrics });

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        MATIC_ON_ETH_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const apy = metrics ? +metrics.matic.apy : 0;
  const balance = data?.maticBalance ?? ZERO;

  return {
    icon: <MaticIcon />,
    token: Token.MATIC,
    href: featuresConfig.maticPolygonStaking
      ? StakeMaticCommonRoutes.stake.path
      : StakeMaticEthRoutes.stake.generatePath(),
    apy,
    balance,
    networks: networksData,
    isLoading: loadingStats || loadingAPY,
    isStakeLoading,
    isShowed: !balance.isZero(),
  };
};
