import {
  BaseTableDataProps,
  IChartData,
  PieChartData,
  UsageHistoryDataMapped,
} from '@ankr.com/telemetry';

import { useAppSelector } from 'store/useAppSelector';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import {
  selectAllTimeRequestsNumber,
  selectSqueezedChainCallsData,
  selectIpRequestsNumber,
  selectProjectsCallData,
  selectRequestsChartData,
  selectResponseCodesNumber,
  selectTopCountries,
  selectTopMonthlyStats,
  selectTotalRequestsNumber,
  selectUsageDataError,
} from 'domains/dashboard/store/selectors/v2';
import { useLazyChainsFetchEnterpriseV2StatsTotalQuery } from 'domains/enterprise/actions/v2/fetchEnterpriseStatsTotal';

interface IUseAllChainsDataResult {
  allTimeTotalRequestsNumber: number;
  countries: BaseTableDataProps[];
  ipRequests: BaseTableDataProps[];
  responses: BaseTableDataProps[];
  requestsChartData: IChartData[];
  totalRequestsNumber: number;
  isLoadingTotalStats: boolean;
  chainCallsData: PieChartData[];
  projectCallsData: PieChartData[];
  monthlyStats: UsageHistoryDataMapped[];
  responseError: unknown;
}

export const useAllChainsDataV2 = (): IUseAllChainsDataResult => {
  const { isEnterpriseStatusLoading } = useEnterpriseClientStatus();

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
  const isLoadingTotalStats =
    isLoading || isFetching || isEnterpriseStatusLoading;
  const monthlyStats = useAppSelector(selectTopMonthlyStats);
  const chainCallsData = useAppSelector(selectSqueezedChainCallsData);
  const projectCallsData = useAppSelector(selectProjectsCallData);
  const responseError = useAppSelector(selectUsageDataError);

  return {
    allTimeTotalRequestsNumber,
    countries,
    ipRequests,
    responses,
    requestsChartData,
    totalRequestsNumber,
    isLoadingTotalStats,
    monthlyStats,
    chainCallsData,
    projectCallsData,
    responseError,
  };
};
