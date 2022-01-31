import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useNetworks } from 'modules/auth/components/GuardRoute/useNetworks';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import {
  POLYGON_PROVIDER_ID,
  YEARLY_INTEREST,
} from 'modules/stake-polygon/const';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

export const useMaticStakableAsset = () => {
  const polygonProvider = useConnectedData(POLYGON_PROVIDER_ID);
  const networks = useNetworks();
  const { data, loading } = useQuery({
    type: fetchStats,
  });

  const currentPolygonNetwork = networks.find(
    network => network.chainId === polygonProvider.chainId,
  );

  return {
    icon: <MaticIcon />,
    token: Token.MATIC,
    href: StakePolygonRoutes.stake.generatePath(),
    apy: YEARLY_INTEREST,
    balance: data?.maticBalance ?? new BigNumber(0),
    networks: [currentPolygonNetwork],
    isLoading: loading,
  };
};
