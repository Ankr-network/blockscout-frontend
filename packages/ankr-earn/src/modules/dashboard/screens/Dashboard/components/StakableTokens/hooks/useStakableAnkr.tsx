import { useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import {
  IETHNetwork,
  useETHNetworks,
} from 'modules/auth/eth/hooks/useETHNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { ANKR_STAKING_NETWORKS } from 'modules/stake-ankr/const';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';

import { IUseStakableToken } from '../types';

export const useStakableAnkr = (): IUseStakableToken<IETHNetwork> => {
  const networks = useETHNetworks();

  const { loading: isLoadingAPY } = useQuery({
    type: getMetrics,
  });

  const { data: apy } = useQuery({
    type: getAPY,
  });

  const { data } = useQuery({ type: getCommonData });

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        ANKR_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const balance = data?.ankrBalance ?? ZERO;

  return {
    icon: <AnkrIcon />,
    token: Token.ANKR,
    href: RoutesConfig.stake.generatePath(),
    apy: apy?.toNumber() ?? 0,
    balance,
    networks: networksData,
    isLoading: isLoadingAPY,
    isStakeLoading: false,
    isShowed: !balance.isZero(),
  };
};
