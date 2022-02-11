import { useDispatchRequest } from '@redux-requests/react';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import {
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
} from 'modules/common/const';
import { getEth2SwapData } from 'modules/eth2Swap/actions/getEth2SwapData';
import { fetchStats as fetchBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { fetchTxHistory as fetchBNBTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { getCommonData as fetchFTMStats } from 'modules/stake-fantom/actions/getCommonData';
import { fetchAPY as fetchPolygonAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { fetchStats as fetchPolygonStats } from 'modules/stake-polygon/actions/fetchStats';
import { fetchTxHistory as fetchPolygonTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { AvailableWriteProviders } from 'provider/providerManager/types';

export const useDashboard = () => {
  const { chainId } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    switch (chainId) {
      case ETH_NETWORK_BY_ENV:
        dispatchRequest(fetchPolygonStats());
        dispatchRequest(fetchPolygonTxHistory());
        dispatchRequest(fetchPolygonAPY());
        dispatchRequest(
          getEth2SwapData({
            providerId: AvailableWriteProviders.ethCompatible,
          }),
        );
        break;

      case BSC_NETWORK_BY_ENV:
        dispatchRequest(fetchBNBStats());
        dispatchRequest(fetchBNBTxHistory());
        break;

      case FTM_NETWORK_BY_ENV:
        dispatchRequest(fetchFTMStats());
        break;

      default:
        break;
    }
  }, [dispatchRequest]);
};
