import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';

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
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/useGetAVAXCommonDataQuery';
import { useGetBNBPendingValuesQuery } from 'modules/stake-bnb/actions/fetchPendingValues';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery';
import { useGetMaticOnPolygonCommonDataQuery } from 'modules/stake-matic/polygon/actions/useGetMaticOnPolygonCommonDataQuery';
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
    getMGNOTotalInfo.toString(),
    getMGNOMaxApr.toString(),
    getMGNOPrice.toString(),
    getMgnoBalance.toString(),
    getSSVOnETHDashboardData.toString(),
    getMetrics.toString(),
    getUnstakeDate.toString(),
  ]);

export const useDashboard = (): void => {
  const dispatch = useAppDispatch();

  const { address } = useConnectedData(AvailableWriteProviders.ethCompatible);

  const { refetch: getAVAXCommonDataRefetch } = useGetAVAXCommonDataQuery();
  const { refetch: getFTMCommonDataRefetch } = useGetFTMCommonDataQuery();

  const { refetch: getBNBPendingValuesRefetch } = useGetBNBPendingValuesQuery();
  const { refetch: getBNBStatsRefetch } = useGetBNBStatsQuery();
  const { refetch: getMATICETHStatsRefetch } = useGetMaticOnEthStatsQuery();

  const { refetch: getXDCDashboardDataRefetch } = getXDCDashboardData();
  const { refetch: getMATICPOLYGONDataRefetch } =
    useGetMaticOnPolygonCommonDataQuery();

  const { refetch: getETHClaimableDataRefetch } = useGetETHClaimableDataQuery();
  const { refetch: getETHCommonDataRefetch } = useGetETHCommonDataQuery();

  usePolkadot();

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(fetchAETHBBridged());
    dispatch(fetchAETHCBridgeBalanceBSC());
    dispatch(fetchAETHCBridged());
    dispatch(fetchAMATICBBridgedBSC());
    dispatch(fetchAMATICCBridgedBSC());
    dispatch(getMetrics());
    dispatch(getUnstakeDate({ poll: UNSTAKE_UPDATE_INTERVAL }));
    getAVAXCommonDataRefetch();
    getFTMCommonDataRefetch();
    getBNBPendingValuesRefetch();
    getBNBStatsRefetch();
    getETHClaimableDataRefetch();
    getETHCommonDataRefetch();
    getMATICPOLYGONDataRefetch();
    getMATICETHStatsRefetch();

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

    if (featuresConfig.xdcActive) {
      getXDCDashboardDataRefetch();
    }

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);
};
