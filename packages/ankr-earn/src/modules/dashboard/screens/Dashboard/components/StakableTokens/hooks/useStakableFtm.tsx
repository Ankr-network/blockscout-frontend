import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { useNetworks } from 'modules/auth/components/GuardRoute/useNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getAPY } from 'modules/stake-fantom/actions/getAPY';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { stake } from 'modules/stake-fantom/actions/stake';
import { FANTOM_STAKING_NETWORKS } from 'modules/stake-fantom/const';
import { RoutesConfig as StakeFantomRoutes } from 'modules/stake-fantom/Routes';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';

import { IUseStakableToken } from '../types';

export const useStakableFtm = (): IUseStakableToken => {
  const networks = useNetworks();
  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { data: apy, loading: loadingAPY } = useQuery({ type: getAPY });

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

  const balance = data?.ftmBalance ?? ZERO;

  return {
    icon: <FantomIcon />,
    balance,
    isShowed: !balance.isZero(),
    networks: networksData,
    token: Token.FTM,
    href: StakeFantomRoutes.stake.generatePath(),
    apy: apy?.toNumber() ?? 0,
    isStakeLoading,
    isLoading: loading || loadingAPY,
  };
};
