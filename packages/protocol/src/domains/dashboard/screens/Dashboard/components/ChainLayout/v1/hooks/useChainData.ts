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
import { useAppSelector } from 'store/useAppSelector';

import { ChainLayoutProps } from '../../types';
import { useTop10Stats } from '../../../AllChainsLayout/v1/hooks/useTop10Stats';

export const useChainData = ({
  detailsChainId,
  statsChainId,
  timeframe,
}: ChainLayoutProps) => {
  const allTimeTotalRequestsNumber = useAppSelector(state =>
    selectAllTimeTotalRequestsNumber(state, statsChainId),
  );

  const chainStats = useAppSelector(state =>
    selectChainStats(state, statsChainId),
  );

  const requests = useAppSelector(state =>
    selectTotalRequestsByChainID(state, statsChainId),
  );

  const totalRequestsNumber = useAppSelector(state =>
    selectTotalRequestsNumberByChainID(state, statsChainId),
  );

  const methodCalls = useAppSelector(state =>
    selectMethodCallsByChainID(state, statsChainId),
  );

  const requestsChartData = useMemo(
    () => getChartDataByRequests({ isLoggedIn: true, requests, timeframe }),
    [requests, timeframe],
  );

  const { countries, ipRequests } = useTop10Stats(timeframe, statsChainId);

  const isLoadingTotalStats = useAppSelector(selectTotalStatsLoading);

  const blockHeight = useAppSelector(state =>
    selectBlockHeight(state, detailsChainId),
  );

  return {
    allTimeTotalRequestsNumber,
    chainStats,
    countries,
    ipRequests,
    requestsChartData,
    totalRequestsNumber,
    methodCalls,
    isLoadingTotalStats,
    blockHeight,
  };
};
