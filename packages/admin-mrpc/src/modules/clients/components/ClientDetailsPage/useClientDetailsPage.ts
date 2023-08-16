import { useEffect, useState } from 'react';
import { PrivateStatsInterval } from 'multirpc-sdk';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { useLazyFetchUserStatsQuery } from 'modules/clients/actions/fetchUserStats';
import { useFetchUserTotalQuery } from 'modules/clients/actions/fetchUserTotal';
import { useLazyFetchUserStatsByRangeQuery } from 'modules/clients/actions/fetchUserStatsByRange';
import { useLazyFetchClients } from 'modules/clients/hooks/useLazyFetchClients';
import { useUserProjectsData } from 'modules/projects/hooks/useUserProjectsData';

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

export const useClientDetailsPage = () => {
  const { address } = ClientsRoutesConfig.clientInfo.useParams();

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
    data: clients,
    isLoading: isLoadingClients,
    isFetching: isFetchingClients,
  } = useLazyFetchClients();

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

  const { data: totalData, isLoading: isLoadingTotal } = useFetchUserTotalQuery(
    { address },
  );

  const { userProjectsData, isLoadingUserProjects } =
    useUserProjectsData(address);

  const currentClient = clients?.counters?.filter(
    client => client.address === address,
  );

  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
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

  const updateTimeframeParam = (
    timeframe: PrivateStatsInterval | CustomRange,
  ) => {
    setPeriodStatement(timeframe);
  };

  const handleSwitchCurrent = () => {
    setIsCurrentDayIncluded(!isCurrentDayIncluded);
  };

  return {
    isLoadingClients: isLoadingClients || isFetchingClients,
    currentClient,
    address,
    statsData: isRangePeriodValue ? statsByRangeData : statsData,
    isLoadingStats: isRangePeriodValue ? isLoadingStatsByRange : isLoadingStats,
    periodStatement,
    totalData,
    isLoadingTotal,
    value,
    handleChange,
    updateTimeframeParam,
    isFetchingStats: isRangePeriodValue
      ? isFetchingStatsByRange
      : isFetchingStats,
    handleSwitchCurrent,
    isCurrentDayIncluded,
    isRangePeriod: isRangePeriodValue,
    clientsErrors: clients?.errors,
    userProjectsData,
    isLoadingUserProjects,
  };
};
