import { useMemo } from 'react';

import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import {
  selectAllTimeTotalRequestsNumber,
  selectBlockHeight,
  selectChainStats,
  selectMethodCallsByChainID,
  selectTotalRequestsByChainID,
  selectTotalRequestsNumberByChainID,
  selectTotalStatsLoading,
} from 'domains/dashboard/store/selectors/v1';
import { selectPrivateStatsLoading } from 'domains/chains/actions/private/fetchPrivateStats';
import { useAppSelector } from 'store/useAppSelector';
import { usePrivateStatsParams } from 'domains/dashboard/screens/Dashboard/hooks/usePrivateStatsParams';

import { ChainLayoutProps } from '../../types';
import { useTop10Stats } from '../../../AllChainsLayout/v1/hooks/useTop10Stats';

export const useChainData = ({
  detailsChainId,
  statsChainId,
  timeframe,
}: ChainLayoutProps) => {
  const { privateStatsParams } = usePrivateStatsParams({ timeframe });
  const allTimeTotalRequestsNumber = useAppSelector(state =>
    selectAllTimeTotalRequestsNumber(state, statsChainId),
  );

  const chainStats = useAppSelector(state =>
    selectChainStats(state, privateStatsParams, statsChainId),
  );

  const requests = useAppSelector(state =>
    selectTotalRequestsByChainID(state, privateStatsParams, statsChainId),
  );

  const privateStatsLoading = useAppSelector(state =>
    selectPrivateStatsLoading(state, privateStatsParams),
  );

  const totalRequestsNumber = useAppSelector(state =>
    selectTotalRequestsNumberByChainID(state, privateStatsParams, statsChainId),
  );

  const methodCalls = useAppSelector(state =>
    selectMethodCallsByChainID(state, privateStatsParams, statsChainId),
  );

  const requestsChartData = useMemo(
    () => getChartDataByRequests({ isLoggedIn: true, requests, timeframe }),
    [requests, timeframe],
  );

  const {
    countries,
    ipRequests,
    isLoading: top10StatsLoading,
  } = useTop10Stats(timeframe, statsChainId);

  const totalStatsLoading = useAppSelector(selectTotalStatsLoading);

  const blockHeight = useAppSelector(state =>
    selectBlockHeight(state, detailsChainId),
  );

  return {
    allTimeTotalRequestsNumber,
    blockHeight,
    chainStats,
    countries,
    ipRequests,
    methodCalls,
    privateStatsLoading,
    requestsChartData,
    top10StatsLoading,
    totalRequestsNumber,
    totalStatsLoading,
  };
};
