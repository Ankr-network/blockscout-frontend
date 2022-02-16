import { resetRequests } from '@redux-requests/core';
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
import { useAppDispatch } from 'store/useAppDispatch';

export const useDashboard = () => {
  const { chainId } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const dispatch = useAppDispatch();

  useProviderEffect(() => {
    dispatch(
      resetRequests([
        fetchPolygonStats.toString(),
        fetchPolygonTxHistory.toString(),
        fetchPolygonAPY.toString(),
        getEth2SwapData.toString(),
        fetchBNBStats.toString(),
        fetchBNBTxHistory.toString(),
        fetchFTMStats.toString(),
      ]),
    );

    switch (chainId) {
      case ETH_NETWORK_BY_ENV:
        dispatch(fetchPolygonStats());
        dispatch(fetchPolygonTxHistory());
        dispatch(fetchPolygonAPY());
        dispatch(
          getEth2SwapData({
            providerId: AvailableWriteProviders.ethCompatible,
          }),
        );
        break;

      case BSC_NETWORK_BY_ENV:
        dispatch(fetchBNBStats());
        dispatch(fetchBNBTxHistory());
        break;

      case FTM_NETWORK_BY_ENV:
        dispatch(fetchFTMStats());
        break;

      default:
        break;
    }
  }, [dispatch]);
};
