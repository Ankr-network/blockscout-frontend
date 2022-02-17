import { useMutation, useQuery } from '@redux-requests/react';
import { useNetworks } from 'modules/auth/components/GuardRoute/useNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import { stake } from 'modules/stake-bnb/actions/stake';
import { BNB_STAKING_NETWORKS, YEARLY_INTEREST } from 'modules/stake-bnb/const';
import { RoutesConfig as StakeBinanceRoutes } from 'modules/stake-bnb/Routes';
import { useMemo } from 'react';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { IUseStakableToken } from '../types';

export const useStakableBnb = (): IUseStakableToken => {
  const networks = useNetworks();
  const { data, loading } = useQuery({
    type: fetchStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const networksData = useMemo(
    () =>
      networks.filter(network =>
        BNB_STAKING_NETWORKS.includes(network.chainId),
      ),
    [networks],
  );

  const balance = data?.bnbBalance ?? ZERO;

  return {
    icon: <BNBIcon />,
    token: Token.BNB,
    href: StakeBinanceRoutes.stake.generatePath(),
    apy: YEARLY_INTEREST,
    balance,
    networks: networksData,
    isLoading: loading,
    isStakeLoading,
    isShowed: !balance.isZero(),
  };
};
