import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useNetworks } from 'modules/auth/components/GuardRoute/useNetworks';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake } from 'modules/stake-polygon/actions/stake';
import { POLYGON_PROVIDER_ID } from 'modules/stake-polygon/const';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { fetchAPY } from '../../../../../../stake-polygon/actions/fetchAPY';
import { useProviderEffect } from '../../../../../../auth/hooks/useProviderEffect';

export const useMaticStakableAsset = () => {
  const polygonProvider = useConnectedData(POLYGON_PROVIDER_ID);
  const networks = useNetworks();
  const { data, loading: loadingStats } = useQuery({
    type: fetchStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const currentPolygonNetwork = networks.find(
    network => network.chainId === polygonProvider.chainId,
  );

  const dispatchRequest = useDispatchRequest();
  useProviderEffect(() => {
    dispatchRequest(fetchAPY());
  }, [dispatchRequest]);
  const { data: apy, loading: loadingAPY } = useQuery({ type: fetchAPY });

  return {
    icon: <MaticIcon />,
    token: Token.MATIC,
    href: StakePolygonRoutes.stake.generatePath(),
    apy: apy?.toNumber() ?? 0,
    balance: data?.maticBalance ?? new BigNumber(0),
    networks: [currentPolygonNetwork],
    isLoading: loadingStats || loadingAPY,
    isStakeLoading,
  };
};
