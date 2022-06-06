import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { useETHNetworks } from 'modules/auth/eth/hooks/useETHNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { stake } from 'modules/stake-eth/actions/stake';
import { ETH_STAKING_NETWORKS } from 'modules/stake-eth/const';
import { RoutesConfig as StakeEthRoutes } from 'modules/stake-eth/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EthIcon } from 'uiKit/Icons/EthIcon';

import { IUseStakableToken } from '../types';

export const useStakableEth = (): IUseStakableToken => {
  const networks = useETHNetworks();

  const { data: metrics, loading: isLoadingAPY } = useQuery({
    type: getMetrics,
  });

  const { data, loading } = useQuery({
    type: getCommonData,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const apy = metrics ? +metrics.eth.apy : 0;

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        ETH_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const balance = data?.ethBalance ?? ZERO;

  return {
    icon: <EthIcon />,
    token: Token.ETH,
    href: StakeEthRoutes.stake.generatePath(),
    apy,
    balance,
    networks: networksData,
    isLoading: loading || isLoadingAPY,
    isStakeLoading,
    isShowed: !balance.isZero(),
  };
};
