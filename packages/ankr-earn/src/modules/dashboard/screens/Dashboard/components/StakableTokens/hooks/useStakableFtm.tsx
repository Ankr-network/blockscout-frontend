import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { useETHNetworks } from 'modules/auth/eth/hooks/useETHNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { stake } from 'modules/stake-fantom/actions/stake';
import { FANTOM_STAKING_NETWORKS } from 'modules/stake-fantom/const';
import { RoutesConfig as StakeFantomRoutes } from 'modules/stake-fantom/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';

import { IUseStakableToken } from '../types';

export const useStakableFtm = (): IUseStakableToken => {
  const networks = useETHNetworks();
  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { data: metrics, loading: loadingAPY } = useQuery({ type: getMetrics });

  const { data, loading } = useQuery({
    type: getCommonData,
  });

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        FANTOM_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const apy = metrics ? +metrics.ftm.apy : 0;

  const balance = data?.ftmBalance ?? ZERO;

  return {
    icon: <FantomIcon />,
    balance,
    isShowed: !balance.isZero(),
    networks: networksData,
    token: Token.FTM,
    href: StakeFantomRoutes.stake.generatePath(),
    apy,
    isStakeLoading,
    isLoading: loading || loadingAPY,
  };
};
