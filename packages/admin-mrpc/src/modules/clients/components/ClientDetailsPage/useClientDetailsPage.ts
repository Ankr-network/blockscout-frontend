import { ChangeEvent, useEffect, useState } from 'react';
import { PrivateStatsInterval } from 'multirpc-sdk';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { useLazyFetchUserStatsQuery } from 'modules/clients/actions/fetchUserStats';
import { useFetchUserTotalQuery } from 'modules/clients/actions/fetchUserTotal';
import { useLazyFetchUserStatsByRangeQuery } from 'modules/clients/actions/fetchUserStatsByRange';
import { useFetchUserByAddressQuery } from 'modules/clients/actions/fetchUserByAddress';
import { useUserProjectsData } from 'modules/projects/hooks/useUserProjectsData';
import { useDatesRange } from 'modules/admin/hooks/useDatesRange';

import { currentMonthParams, previousMonthParams } from '../../utils/dates';

export enum CustomRange {
  current = 'current',
  previous = 'previous',
}

const requestParams = {
  [CustomRange.current]: currentMonthParams,
  [CustomRange.previous]: previousMonthParams,
};

function isRangePeriod(
  period: PrivateStatsInterval | CustomRange,
): period is CustomRange {
  return Object.values(CustomRange).includes(period as any);
}

/* eslint-disable max-lines-per-function */
export const useClientDetailsPage = () => {
  const { address } = ClientsRoutesConfig.clientInfo.useParams();

  const { dateFrom, dateTo, onChangeFrom, onChangeTo } = useDatesRange(false);

  useSetBreadcrumbs([
    {
      title: 'clients',
      link: ClientsRoutesConfig.clients.generatePath(),
    },
    {
      title: `${shrinkAddress(address)}`,
    },
  ]);

  const [periodStatement, setPeriodStatement] = useState<
    PrivateStatsInterval | CustomRange
  >(PrivateStatsInterval.DAY);

  const isRangePeriodValue = isRangePeriod(periodStatement);

  const [isCurrentDayIncluded, setIsCurrentDayIncluded] = useState(false);

  const {
    data: currentClient,
    isLoading: isCurrentClientLoading,
    isFetching: isCurrentClientFetching,
  } = useFetchUserByAddressQuery(address);

  const [
    fetchStats,
    { data: statsData, isLoading: isLoadingStats, isFetching: isFetchingStats },
  ] = useLazyFetchUserStatsQuery();

  const [
    fetchStatsByRange,
    {
      data: statsByRangeData,
      isLoading: isLoadingStatsByRange,
      isFetching: isFetchingStatsByRange,
    },
  ] = useLazyFetchUserStatsByRangeQuery();

  const [
    fetchCsvStatsByRange,
    {
      data: csvStatsData,
      isLoading: isLoadingCsvStats,
      isFetching: isFetchingCsvStats,
    },
  ] = useLazyFetchUserStatsByRangeQuery();

  const { data: totalData, isLoading: isLoadingTotal } = useFetchUserTotalQuery(
    { address },
  );

  const { userProjectsData, isLoadingUserProjects } =
    useUserProjectsData(address);

  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isRangePeriodValue) {
      fetchStatsByRange({
        address,
        ...requestParams[periodStatement as CustomRange],
      });
    } else {
      fetchStats({
        address,
        interval: periodStatement,
        current: isCurrentDayIncluded,
      });
    }
  }, [
    fetchStats,
    fetchStatsByRange,
    isRangePeriodValue,
    periodStatement,
    address,
    isCurrentDayIncluded,
  ]);

  useEffect(() => {
    if (dateFrom !== '' && dateTo !== '') {
      fetchCsvStatsByRange({
        address,
        from: new Date(dateFrom).getTime(),
        to: new Date(dateTo).getTime(),
      });
    }
  }, [address, dateFrom, dateTo, fetchCsvStatsByRange]);

  const updateTimeframeParam = (
    timeframe: PrivateStatsInterval | CustomRange,
  ) => {
    setPeriodStatement(timeframe);
  };

  const handleSwitchCurrent = () => {
    setIsCurrentDayIncluded(!isCurrentDayIncluded);
  };

  return {
    isCurrentClientLoading: isCurrentClientLoading || isCurrentClientFetching,
    currentClient,
    address,
    statsData: isRangePeriodValue ? statsByRangeData : statsData,
    isLoadingStats: isRangePeriodValue ? isLoadingStatsByRange : isLoadingStats,
    isFetchingStats: isRangePeriodValue
      ? isFetchingStatsByRange
      : isFetchingStats,
    csvStatsData,
    isLoadingCsvStats,
    isFetchingCsvStats,
    periodStatement,
    totalData,
    isLoadingTotal,
    value,
    handleChange,
    updateTimeframeParam,
    handleSwitchCurrent,
    isCurrentDayIncluded,
    isRangePeriod: isRangePeriodValue,
    userProjectsData,
    isLoadingUserProjects,
    dateFrom,
    onChangeFrom,
    dateTo,
    onChangeTo,
  };
};
