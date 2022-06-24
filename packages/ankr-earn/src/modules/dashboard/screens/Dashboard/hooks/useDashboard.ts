import { resetRequests } from '@redux-requests/core';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { fetchAETHBBridged } from 'modules/dashboard/actions/fetchAETHBBridged';
import { fetchAMATICBBridged } from 'modules/dashboard/actions/fetchAMATICBBridged';
import { fetchAMATICBBridgedBSC } from 'modules/dashboard/actions/fetchAMATICBBridgedBSC';
import { fetchAMATICCBridgedBSC } from 'modules/dashboard/actions/fetchAMATICCBridgedBSC';
import { fetchAMATICCBridgedPolygon } from 'modules/dashboard/actions/fetchAMATICCBridgedPolygon';
import { fetchPendingValues as fetchAVAXPendingValues } from 'modules/stake-avax/actions/fetchPendingValues';
import { fetchStats as fetchAVAXStats } from 'modules/stake-avax/actions/fetchStats';
import { fetchTxHistory as fetchAVAXTxHistory } from 'modules/stake-avax/actions/fetchTxHistory';
import { fetchPendingValues as fetchBNBPendingValues } from 'modules/stake-bnb/actions/fetchPendingValues';
import { fetchStats as fetchBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { fetchTxHistory as fetchBNBTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { getCommonData as getEthCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getTxHistoryETH } from 'modules/stake-eth/actions/getTxHistoryAETHB';
import { getCommonData as getFTMStats } from 'modules/stake-fantom/actions/getCommonData';
import { getHistory as getFTMHistory } from 'modules/stake-fantom/actions/getHistory';
import { fetchStats as fetchPolygonStats } from 'modules/stake-polygon/actions/fetchStats';
import { fetchTxHistory as fetchPolygonTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { useAppDispatch } from 'store/useAppDispatch';

import { usePolkadot } from './usePolkadot';

export const useDashboard = (): void => {
  const dispatch = useAppDispatch();

  usePolkadot();

  useProviderEffect(() => {
    dispatch(
      resetRequests([
        fetchPolygonStats.toString(),
        fetchAMATICBBridged.toString(),
        fetchAMATICBBridgedBSC.toString(),
        fetchAETHBBridged.toString(),
        fetchPolygonTxHistory.toString(),
        getEthCommonData.toString(),
        fetchAVAXStats.toString(),
        fetchAVAXTxHistory.toString(),
        fetchBNBStats.toString(),
        fetchBNBTxHistory.toString(),
        getFTMStats.toString(),
        getFTMHistory.toString(),
        getTxHistoryETH.toString(),
        getMetrics.toString(),
        fetchAMATICCBridgedBSC.toString(),
        fetchAMATICCBridgedPolygon.toString(),
      ]),
    );

    dispatch(getEthCommonData());

    dispatch(fetchPolygonStats());
    dispatch(fetchAMATICBBridged());
    dispatch(fetchAMATICBBridgedBSC());
    dispatch(fetchAMATICCBridgedBSC());
    dispatch(fetchAMATICCBridgedPolygon());
    dispatch(fetchAETHBBridged());
    dispatch(getMetrics());
    dispatch(fetchAVAXStats());
    dispatch(fetchBNBStats());
    dispatch(fetchBNBPendingValues());
    dispatch(fetchAVAXPendingValues());
    dispatch(getFTMStats());
  }, [dispatch]);
};
