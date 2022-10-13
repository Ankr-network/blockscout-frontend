import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import { useState } from 'react';

import { AvailableWriteProviders } from 'common';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { featuresConfig } from 'modules/common/const';
import { fetchAETHBBridged } from 'modules/dashboard/actions/fetchAETHBBridged';
import { fetchAETHCBridgeBalanceBSC } from 'modules/dashboard/actions/fetchAETHCBridgeBalanceBSC';
import { fetchAETHCBridged } from 'modules/dashboard/actions/fetchAETHCBridged';
import { fetchAMATICBBridgedBSC } from 'modules/dashboard/actions/fetchAMATICBBridgedBSC';
import { fetchAMATICCBridgedBSC } from 'modules/dashboard/actions/fetchAMATICCBridgedBSC';
import { getPartnerCode } from 'modules/referrals/actions/getPartnerCode';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getCommonData as getANKRCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getTotalInfo as getANKRTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { fetchPendingValues as fetchAVAXPendingValues } from 'modules/stake-avax/actions/fetchPendingValues';
import { fetchStats as fetchAVAXStats } from 'modules/stake-avax/actions/fetchStats';
import { fetchTotalHistoryData as fetchAVAXTxHistory } from 'modules/stake-avax/actions/fetchTotalHistoryData';
import { fetchPendingValues as fetchBNBPendingValues } from 'modules/stake-bnb/actions/fetchPendingValues';
import { fetchStats as fetchBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { fetchTotalHistory as fetchBNBTxHistory } from 'modules/stake-bnb/actions/fetchTotalHistory';
import { getCommonData as getEthCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getTotalHistory } from 'modules/stake-eth/actions/getTotalHistory';
import { getCommonData as getFTMStats } from 'modules/stake-fantom/actions/getCommonData';
import { getTotalHistoryData as getFTMHistory } from 'modules/stake-fantom/actions/getTotalHistoryData';
import { fetchStats as fetchPolygonStats } from 'modules/stake-matic/eth/actions/fetchStats';
import { fetchTotalHistory as fetchPolygonTxHistory } from 'modules/stake-matic/eth/actions/fetchTotalHistory';
import { getCommonData as getMaticPolygonCommonData } from 'modules/stake-matic/polygon/actions/getCommonData';
import { getBalance as getMgnoBalance } from 'modules/stake-mgno/actions/getBalance';
import { getMaxApr as getMGNOMaxApr } from 'modules/stake-mgno/actions/getMaxApr';
import { getMGNOPrice } from 'modules/stake-mgno/actions/getMGNOPrice';
import { getTotalInfo as getMGNOTotalInfo } from 'modules/stake-mgno/actions/getTotalInfo';
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
    getMGNOTotalInfo.toString(),
    getMGNOMaxApr.toString(),
    getMGNOPrice.toString(),
    getMgnoBalance.toString(),
    getEthCommonData.toString(),
    getFTMHistory.toString(),
    getFTMStats.toString(),
    getMetrics.toString(),
    getTotalHistory.toString(),
    getUnstakeDate.toString(),
    getMaticPolygonCommonData.toString(),
  ]);

interface IUseDashboard {
  isFirstLoad: boolean;
}

export const useDashboard = (): IUseDashboard => {
  const dispatch = useAppDispatch();
  const [isFirstLoad, setFirstLoad] = useState(true);

  const { address } = useAuth(AvailableWriteProviders.ethCompatible);

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
    dispatch(getANKRCommonData());
    dispatch(getANKRPrice());
    dispatch(getANKRTotalInfo());

    if (address) {
      dispatch(getPartnerCode(address));
    }

    if (featuresConfig.mgnoStaking) {
      dispatch(getMGNOTotalInfo());
      dispatch(getMGNOMaxApr());
      dispatch(getMGNOPrice());
      dispatch(getMgnoBalance());
    }

    setFirstLoad(false);

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

  return { isFirstLoad };
};
