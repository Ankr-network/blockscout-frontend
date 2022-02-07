import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useNetworks } from 'modules/auth/components/GuardRoute/useNetworks';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import { stake } from 'modules/stake-bnb/actions/stake';
import { BINANCE_PROVIDER_ID, YEARLY_INTEREST } from 'modules/stake-bnb/const';
import { RoutesConfig as StakeBinanceRoutes } from 'modules/stake-bnb/Routes';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';

export const useBNBStakableAsset = () => {
  const binanceProvider = useConnectedData(BINANCE_PROVIDER_ID);
  const networks = useNetworks();
  const { data, loading } = useQuery({
    type: fetchStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const currentBinanceNetwork = networks.find(
    network => network.chainId === binanceProvider.chainId,
  );

  return {
    icon: <BNBIcon />,
    token: Token.BNB,
    href: StakeBinanceRoutes.stake.generatePath(),
    apy: YEARLY_INTEREST,
    balance: data?.bnbBalance ?? new BigNumber(0),
    networks: [currentBinanceNetwork],
    isLoading: loading,
    isStakeLoading,
  };
};
