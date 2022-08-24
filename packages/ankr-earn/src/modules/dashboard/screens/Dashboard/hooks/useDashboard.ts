import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { featuresConfig } from 'modules/common/const';
import { fetchAETHBBridged } from 'modules/dashboard/actions/fetchAETHBBridged';
import { fetchAETHCBridgeBalanceBSC } from 'modules/dashboard/actions/fetchAETHCBridgeBalanceBSC';
import { fetchAETHCBridged } from 'modules/dashboard/actions/fetchAETHCBridged';
import { fetchAMATICBBridgedBSC } from 'modules/dashboard/actions/fetchAMATICBBridgedBSC';
import { fetchAMATICCBridgedBSC } from 'modules/dashboard/actions/fetchAMATICCBridgedBSC';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getCommonData as getANKRCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getMaxApy } from 'modules/stake-ankr/actions/getMaxApy';
import { getTotalInfo as getANKRTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
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
import { fetchStats as fetchPolygonStats } from 'modules/stake-matic/eth/actions/fetchStats';
import { fetchTxHistory as fetchPolygonTxHistory } from 'modules/stake-matic/eth/actions/fetchTxHistory';
import { getCommonData as getMaticPolygonCommonData } from 'modules/stake-matic/polygon/actions/getCommonData';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';
import { UNSTAKE_UPDATE_INTERVAL } from 'modules/stake/const';
import { useAppDispatch } from 'store/useAppDispatch';

import { usePolkadot } from './usePolkadot';

const resetRequests = () =>
  resetReduxRequests([
    fetchAETHBBridged.toString(),
    fetchAETHCBridgeBalanceBSC.toString(),
    fetchAETHCBridged.toString(),
    fetchAMATICBBridgedBSC.toString(),
    fetchAMATICCBridgedBSC.toString(),
    fetchAVAXPendingValues.toString(),
    fetchAVAXStats.toString(),
    fetchAVAXTxHistory.toString(),
    fetchBNBPendingValues.toString(),
    fetchBNBStats.toString(),
    fetchBNBTxHistory.toString(),
    fetchPolygonStats.toString(),
    fetchPolygonTxHistory.toString(),
    getANKRCommonData.toString(),
    getANKRPrice.toString(),
    getANKRTotalInfo.toString(),
    getMaxApy.toString(),
    getEthCommonData.toString(),
    getFTMHistory.toString(),
    getFTMStats.toString(),
    getMetrics.toString(),
    getTxHistoryETH.toString(),
    getUnstakeDate.toString(),
    getMaticPolygonCommonData.toString(),
  ]);

export const useDashboard = (): void => {
  const dispatch = useAppDispatch();

  usePolkadot();

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(fetchAETHBBridged());
    dispatch(fetchAETHCBridgeBalanceBSC());
    dispatch(fetchAETHCBridged());
    dispatch(fetchAMATICBBridgedBSC());
    dispatch(fetchAMATICCBridgedBSC());
    dispatch(fetchAVAXPendingValues());
    dispatch(fetchAVAXStats());
    dispatch(fetchBNBPendingValues());
    dispatch(fetchBNBStats());
    dispatch(fetchPolygonStats());
    dispatch(getEthCommonData());
    dispatch(getFTMStats());
    dispatch(getMetrics());
    dispatch(getUnstakeDate({ poll: UNSTAKE_UPDATE_INTERVAL }));
    dispatch(getMaticPolygonCommonData());

    if (featuresConfig.ankrStaking) {
      dispatch(getANKRCommonData());
      dispatch(getANKRPrice());
      dispatch(getANKRTotalInfo());
      dispatch(getMaxApy());
    }

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);
};
