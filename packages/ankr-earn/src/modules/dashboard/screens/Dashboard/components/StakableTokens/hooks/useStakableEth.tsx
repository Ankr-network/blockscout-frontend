import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { useETHNetworks } from 'modules/auth/eth/hooks/useETHNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getAPY } from 'modules/stake-eth/actions/getAPY';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { stake } from 'modules/stake-eth/actions/stake';
import { ETH_STAKING_NETWORKS } from 'modules/stake-eth/const';
import { RoutesConfig as StakeEthRoutes } from 'modules/stake-eth/Routes';
import { EthIcon } from 'uiKit/Icons/EthIcon';

import { IUseStakableToken } from '../types';

export const useStakableEth = (): IUseStakableToken => {
  const networks = useETHNetworks();

  const { data: apy, loading: isLoadingAPY } = useQuery({
    type: getAPY,
  });

  const { data, loading } = useQuery({
    type: getCommonData,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });

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
    apy: apy ?? 0,
    balance,
    networks: networksData,
    isLoading: loading || isLoadingAPY,
    isStakeLoading,
    isShowed: !balance.isZero(),
  };
};
