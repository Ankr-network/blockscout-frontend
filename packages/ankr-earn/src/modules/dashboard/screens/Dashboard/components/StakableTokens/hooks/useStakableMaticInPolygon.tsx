import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import {
  IETHNetwork,
  useETHNetworks,
} from 'modules/auth/eth/hooks/useETHNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { MATIC_ON_POLYGON_STAKING_NETWORKS } from 'modules/stake-matic/common/const';
import { getCommonData } from 'modules/stake-matic/polygon/actions/getCommonData';
import { stake } from 'modules/stake-matic/polygon/actions/stake';
import { RoutesConfig as StakeMaticPolygonRoutes } from 'modules/stake-matic/polygon/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { IUseStakableToken } from '../types';

export const useStakableMaticInPolygon = (): IUseStakableToken<IETHNetwork> => {
  const networks = useETHNetworks();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { data: commonData, loading: isLoadingCommonData } = useQuery({
    type: getCommonData,
  });

  const { data: metrics, loading: isLoadingMetrics } = useQuery({
    type: getMetrics,
  });

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        MATIC_ON_POLYGON_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const apy = metrics ? +metrics.matic.apy : 0;

  const balance = commonData?.maticBalance ?? ZERO;

  return {
    apy,
    balance,
    href: StakeMaticPolygonRoutes.stake.generatePath(),
    icon: <MaticIcon />,
    isLoading: isLoadingCommonData || isLoadingMetrics,
    isShowed: !balance.isZero(),
    isStakeLoading,
    networks: networksData,
    token: Token.MATIC,
  };
};
