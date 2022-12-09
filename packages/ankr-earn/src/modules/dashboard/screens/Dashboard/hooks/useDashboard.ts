import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import { useState } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { featuresConfig } from 'modules/common/const';
import { fetchAETHBBridged } from 'modules/dashboard/actions/fetchAETHBBridged';
import { fetchAETHCBridgeBalanceBSC } from 'modules/dashboard/actions/fetchAETHCBridgeBalanceBSC';
import { fetchAETHCBridged } from 'modules/dashboard/actions/fetchAETHCBridged';
import { fetchAMATICBBridgedBSC } from 'modules/dashboard/actions/fetchAMATICBBridgedBSC';
import { fetchAMATICCBridgedBSC } from 'modules/dashboard/actions/fetchAMATICCBridgedBSC';
import { getPartnerCode } from 'modules/referrals/actions/getPartnerCode';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/fetchCommonData';
import { useGetBNBPendingValuesQuery } from 'modules/stake-bnb/actions/fetchPendingValues';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';
import { getClaimableData as getEthClaimableData } from 'modules/stake-eth/actions/getClaimableData';
import { getCommonData as getEthCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getTotalHistory } from 'modules/stake-eth/actions/getTotalHistory';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { fetchStats as fetchPolygonStats } from 'modules/stake-matic/eth/actions/fetchStats';
import { fetchTotalHistory as fetchPolygonTxHistory } from 'modules/stake-matic/eth/actions/fetchTotalHistory';
import { getCommonData as getMaticPolygonCommonData } from 'modules/stake-matic/polygon/actions/getCommonData';
import { getBalance as getMgnoBalance } from 'modules/stake-mgno/actions/getBalance';
import { getMaxApr as getMGNOMaxApr } from 'modules/stake-mgno/actions/getMaxApr';
import { getMGNOPrice } from 'modules/stake-mgno/actions/getMGNOPrice';
import { getTotalInfo as getMGNOTotalInfo } from 'modules/stake-mgno/actions/getTotalInfo';
import { getDashboardData as getSSVOnETHDashboardData } from 'modules/stake-ssv/actions/getDashboardData';
import { useGetDashboardDataQuery as getXDCDashboardData } from 'modules/stake-xdc/actions/getDashboardData';
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
    fetchPolygonStats.toString(),
    fetchPolygonTxHistory.toString(),
    getMGNOTotalInfo.toString(),
    getMGNOMaxApr.toString(),
    getMGNOPrice.toString(),
    getMgnoBalance.toString(),
    getEthCommonData.toString(),
    getEthClaimableData.toString(),
    getSSVOnETHDashboardData.toString(),
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

  const { address } = useConnectedData(AvailableWriteProviders.ethCompatible);

  const { refetch: getAVAXCommonDataRefetch } = useGetAVAXCommonDataQuery();
  const { refetch: getFTMCommonDataRefetch } = useGetFTMCommonDataQuery();

  const { refetch: getBNBPendingValuesRefetch } = useGetBNBPendingValuesQuery();
  const { refetch: getBNBStatsRefetch } = useGetBNBStatsQuery();

  const { refetch: getXDCDashboardDataRefetch } = getXDCDashboardData();

  usePolkadot();

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(fetchAETHBBridged());
    dispatch(fetchAETHCBridgeBalanceBSC());
    dispatch(fetchAETHCBridged());
    dispatch(fetchAMATICBBridgedBSC());
    dispatch(fetchAMATICCBridgedBSC());
    dispatch(fetchPolygonStats());
    dispatch(getEthCommonData());
    dispatch(getEthClaimableData());
    dispatch(getMetrics());
    dispatch(getUnstakeDate({ poll: UNSTAKE_UPDATE_INTERVAL }));
    dispatch(getMaticPolygonCommonData());
    getAVAXCommonDataRefetch();
    getFTMCommonDataRefetch();
    getBNBPendingValuesRefetch();
    getBNBStatsRefetch();

    if (address) {
      dispatch(getPartnerCode(address));
    }

    if (featuresConfig.mgnoStaking) {
      dispatch(getMGNOTotalInfo());
      dispatch(getMGNOMaxApr());
      dispatch(getMGNOPrice());
      dispatch(getMgnoBalance());
    }

    if (featuresConfig.ssvStaking) {
      dispatch(getSSVOnETHDashboardData());
    }

    if (featuresConfig.xdcStaking) {
      getXDCDashboardDataRefetch();
    }

    setFirstLoad(false);

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

  return { isFirstLoad };
};
