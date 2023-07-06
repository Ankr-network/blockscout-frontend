import { useMemo } from 'react';

import { Timeframe } from 'domains/chains/types';
import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import {
  selectAllTimeTotalRequestsNumber,
  selectIPRequests,
  selectLocations,
  selectLocationsLoading,
  selectTopCountries,
  selectTotalRequests,
  selectTotalRequestsNumber,
} from 'domains/dashboard/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export const useAllChainsData = (timeframe: Timeframe) => {
  const allTimeTotalRequestsNumber = useAppSelector(
    selectAllTimeTotalRequestsNumber,
  );
  const countries = useAppSelector(selectTopCountries);
  const ipRequests = useAppSelector(selectIPRequests);
  const locations = useAppSelector(selectLocations);
  const areLocationsLoading = useAppSelector(selectLocationsLoading);
  const requests = useAppSelector(selectTotalRequests);
  const totalRequestsNumber = useAppSelector(selectTotalRequestsNumber);

  const requestsChartData = useMemo(
    () => getChartDataByRequests({ isLoggedIn: true, requests, timeframe }),
    [requests, timeframe],
  );

  return {
    allTimeTotalRequestsNumber,
    areLocationsLoading,
    countries,
    ipRequests,
    locations,
    requestsChartData,
    totalRequestsNumber,
  };
};
