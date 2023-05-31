import { useMemo } from 'react';

import { ChainLayoutProps } from '../types';
import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import {
  selectAllTimeTotalRequestsNumber,
  selectChainStats,
  selectIPRequestsByChainID,
  selectLocationsByChainID,
  selectLocationsLoading,
  selectMethodCallsByChainID,
  selectTopCountriesByChainID,
  selectTotalRequestsByChainID,
  selectTotalRequestsNumberByChainID,
} from 'domains/dashboard/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export const useChainData = ({
  statsChainId,
  timeframe,
}: Omit<ChainLayoutProps, 'detailsChainId'>) => {
  const allTimeTotalRequestsNumber = useAppSelector(state =>
    selectAllTimeTotalRequestsNumber(state, statsChainId),
  );

  const chainStats = useAppSelector(state =>
    selectChainStats(state, statsChainId),
  );

  const countries = useAppSelector(state =>
    selectTopCountriesByChainID(state, statsChainId),
  );

  const ipRequests = useAppSelector(state =>
    selectIPRequestsByChainID(state, statsChainId),
  );

  const locations = useAppSelector(state =>
    selectLocationsByChainID(state, statsChainId),
  );

  const areLocationsLoading = useAppSelector(selectLocationsLoading);

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

  return {
    allTimeTotalRequestsNumber,
    areLocationsLoading,
    chainStats,
    countries,
    ipRequests,
    locations,
    requestsChartData,
    totalRequestsNumber,
    methodCalls,
  };
};
