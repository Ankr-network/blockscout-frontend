import { resetRequests } from '@redux-requests/core';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { featuresConfig } from 'modules/common/const';
import { fetchAMATICBBridged } from 'modules/dashboard/actions/fetchAMATICBBridged';
import { fetchAPY as fetchAVAXAPY } from 'modules/stake-avax/actions/fetchAPY';
import { fetchStats as fetchAVAXStats } from 'modules/stake-avax/actions/fetchStats';
import { fetchTxHistory as fetchAVAXTxHistory } from 'modules/stake-avax/actions/fetchTxHistory';
import { fetchAPY as fetchBNBAPY } from 'modules/stake-bnb/actions/fetchAPY';
import { fetchStats as fetchBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { fetchTxHistory as fetchBNBTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { getAPY as getEthAPY } from 'modules/stake-eth/actions/getAPY';
import { getCommonData as getEthCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getTxHistoryETH } from 'modules/stake-eth/actions/getTxHistoryAETHB';
import { getAPY as getAftmbAPY } from 'modules/stake-fantom/actions/getAPY';
import { getCommonData as getFTMStats } from 'modules/stake-fantom/actions/getCommonData';
import { getHistory as getFTMHistory } from 'modules/stake-fantom/actions/getHistory';
import { fetchAPY as fetchPolygonAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { fetchStats as fetchPolygonStats } from 'modules/stake-polygon/actions/fetchStats';
import { fetchTxHistory as fetchPolygonTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { useAppDispatch } from 'store/useAppDispatch';

export const useDashboard = (): void => {
  const dispatch = useAppDispatch();

  useProviderEffect(() => {
    dispatch(
      resetRequests([
        fetchPolygonStats.toString(),
        fetchAMATICBBridged.toString(),
        fetchPolygonTxHistory.toString(),
        getEthCommonData.toString(),
        fetchAVAXStats.toString(),
        fetchAVAXTxHistory.toString(),
        fetchBNBStats.toString(),
        fetchBNBTxHistory.toString(),
        getFTMStats.toString(),
        getFTMHistory.toString(),
        getTxHistoryETH.toString(),
      ]),
    );

    dispatch(getEthCommonData());
    if (featuresConfig.stakeETH) {
      dispatch(getEthAPY());
    }

    dispatch(fetchPolygonStats());
    dispatch(fetchAMATICBBridged());
    dispatch(fetchPolygonAPY());

    dispatch(fetchAVAXAPY());
    dispatch(fetchAVAXStats());

    dispatch(fetchBNBAPY());
    dispatch(fetchBNBStats());

    dispatch(getFTMStats());
    dispatch(getAftmbAPY());
  }, [dispatch]);
};
