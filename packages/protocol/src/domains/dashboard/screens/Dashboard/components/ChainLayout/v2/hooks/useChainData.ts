import { useAppSelector } from 'store/useAppSelector';
import { useLazyChainsFetchEnterpriseV2StatsTotalQuery } from 'domains/enterprise/actions/v2/fetchEnterpriseStatsTotal';
import {
  selectAllTimeRequestsNumber,
  selectIpRequestsNumber,
  selectMethodCallsData,
  selectRequestsChartData,
  selectResponseCodesNumber,
  selectTopCountries,
  selectTopMonthlyStats,
  selectTotalRequestsNumber,
  selectUsageDataError,
} from 'domains/dashboard/store/selectors/v2';
import { selectBlockHeight } from 'domains/dashboard/store/selectors/v1';

import { ChainLayoutProps } from '../../types';

export const useChainData = ({ detailsChainId }: ChainLayoutProps) => {
  const [, { isFetching, isLoading }] =
    useLazyChainsFetchEnterpriseV2StatsTotalQuery();

  const allTimeTotalRequestsNumber = useAppSelector(
    selectAllTimeRequestsNumber,
  );
  const countries = useAppSelector(selectTopCountries);
  const ipRequests = useAppSelector(selectIpRequestsNumber);
  const responses = useAppSelector(selectResponseCodesNumber);
  const requestsChartData = useAppSelector(selectRequestsChartData);
  const totalRequestsNumber = useAppSelector(selectTotalRequestsNumber);
  const totalStatsLoading = isLoading || isFetching;
  const monthlyStats = useAppSelector(selectTopMonthlyStats);
  const methodCalls = useAppSelector(selectMethodCallsData);
  const responseError = useAppSelector(selectUsageDataError);

  const blockHeight = useAppSelector(state =>
    selectBlockHeight(state, detailsChainId),
  );

  return {
    allTimeTotalRequestsNumber,
    blockHeight,
    countries,
    ipRequests,
    methodCalls,
    monthlyStats,
    requestsChartData,
    responseError,
    responses,
    totalRequestsNumber,
    totalStatsLoading,
  };
};
