import { useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import {
  IETHNetwork,
  useETHNetworks,
} from 'modules/auth/eth/hooks/useETHNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getMaxApy } from 'modules/stake-ankr/actions/getMaxApy';
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

  const { data: maxApy } = useQuery({
    type: getMaxApy,
  });

  const { data } = useQuery({ type: getCommonData });

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        ANKR_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const balance = data?.ankrBalance.integerValue() ?? ZERO;

  return {
    isDelegatedStaking: true,
    icon: <AnkrIcon />,
    token: Token.ANKR,
    href: RoutesConfig.stake.generatePath(),
    apy: maxApy?.toNumber() ?? 0,
    balance,
    networks: networksData,
    isLoading: isLoadingAPY,
    isStakeLoading: false,
    isShowed: !balance.isZero(),
  };
};
