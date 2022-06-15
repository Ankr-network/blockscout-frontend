import { useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import {
  IETHNetwork,
  useETHNetworks,
} from 'modules/auth/eth/hooks/useETHNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { ANKR_STAKING_NETWORKS } from 'modules/stake-ankr/const';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';

import { IUseStakableToken } from '../types';

export const useStakableAnkr = (): IUseStakableToken<IETHNetwork> => {
  const networks = useETHNetworks();

  const { loading: isLoadingAPY } = useQuery({
    type: getMetrics,
  });

  const apy = 0;

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        ANKR_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const balance = ZERO;

  return {
    icon: <AnkrIcon />,
    token: Token.ANKR,
    href: '',
    apy,
    balance,
    networks: networksData,
    isLoading: isLoadingAPY,
    isStakeLoading: false,
    isShowed: !balance.isZero(),
  };
};
