import { resetRequests } from '@redux-requests/core';

import { AvailableWriteProviders } from 'provider';

import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import {
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  featuresConfig,
  FTM_NETWORK_BY_ENV,
} from 'modules/common/const';
import { getEth2SwapData } from 'modules/eth2Swap/actions/getEth2SwapData';
import { fetchAPY as fetchAVAXAPY } from 'modules/stake-avax/actions/fetchAPY';
import { fetchStats as fetchAVAXStats } from 'modules/stake-avax/actions/fetchStats';
import { fetchTxHistory as fetchAVAXTxHistory } from 'modules/stake-avax/actions/fetchTxHistory';
import { fetchAPY as fetchBNBAPY } from 'modules/stake-bnb/actions/fetchAPY';
import { fetchStats as fetchBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { fetchTxHistory as fetchBNBTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { getAPY as getAftmbAPY } from 'modules/stake-fantom/actions/getAPY';
import { getCommonData as getFTMStats } from 'modules/stake-fantom/actions/getCommonData';
import { getHistory as getFTMHistory } from 'modules/stake-fantom/actions/getHistory';
import { fetchAPY as fetchPolygonAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { fetchStats as fetchPolygonStats } from 'modules/stake-polygon/actions/fetchStats';
import { fetchTxHistory as fetchPolygonTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { useAppDispatch } from 'store/useAppDispatch';

export const useDashboard = (): void => {
  const { chainId } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const dispatch = useAppDispatch();

  useProviderEffect(() => {
    dispatch(
      resetRequests([
        fetchPolygonStats.toString(),
        fetchPolygonTxHistory.toString(),
        getEth2SwapData.toString(),
        fetchAVAXStats.toString(),
        fetchAVAXTxHistory.toString(),
        fetchBNBStats.toString(),
        fetchBNBTxHistory.toString(),
        getFTMStats.toString(),
        getFTMHistory.toString(),
      ]),
    );

    if (featuresConfig.multiNetwork) {
      dispatch(fetchPolygonTxHistory());
      dispatch(fetchPolygonStats());
      dispatch(fetchPolygonAPY());

      dispatch(getEth2SwapData());

      dispatch(fetchAVAXAPY());
      dispatch(fetchAVAXStats());
      dispatch(fetchAVAXTxHistory());

      dispatch(fetchBNBAPY());
      dispatch(fetchBNBStats());
      dispatch(fetchBNBTxHistory());

      dispatch(getFTMStats());
      dispatch(getFTMHistory());
      dispatch(getAftmbAPY());

      return;
    }

    switch (chainId) {
      case ETH_NETWORK_BY_ENV:
        dispatch(fetchPolygonTxHistory());
        dispatch(fetchPolygonStats());
        dispatch(fetchPolygonAPY());
        dispatch(
          getEth2SwapData({
            providerId: AvailableWriteProviders.ethCompatible,
          }),
        );
        break;

      case AVAX_NETWORK_BY_ENV:
        dispatch(fetchAVAXAPY());
        dispatch(fetchAVAXStats());
        dispatch(fetchAVAXTxHistory());
        break;

      case BSC_NETWORK_BY_ENV:
        dispatch(fetchBNBAPY());
        dispatch(fetchBNBStats());
        dispatch(fetchBNBTxHistory());
        break;

      case FTM_NETWORK_BY_ENV:
        dispatch(getFTMStats());
        dispatch(getFTMHistory());
        dispatch(getAftmbAPY());
        break;

      default:
        break;
    }
  }, [dispatch]);
};
