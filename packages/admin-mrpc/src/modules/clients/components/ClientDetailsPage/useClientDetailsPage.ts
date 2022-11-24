import { useState } from 'react';
import { PrivateStatsInterval } from 'multirpc-sdk';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { useFetchCountersQuery } from 'modules/clients/actions/fetchCounters';
import { useFetchUserTransactionsQuery } from 'modules/clients/actions/fetchUserTransactions';
import { useFetchUserStatsQuery } from 'modules/clients/actions/fetchUserStats';
import { useFetchUserTotalQuery } from 'modules/clients/actions/fetchUserTotal';
import { useFetchUserStatsByRangeQuery } from 'modules/clients/actions/fetchUserStatsByRange';
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

  const { data: clients, isLoading: isLoadingClients } =
    useFetchCountersQuery();
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useFetchUserTransactionsQuery({ address });
  const {
    data: statsData,
    isLoading: isLoadingStats,
    isFetching: isFetchingStats,
  } = useFetchUserStatsQuery({
    address,
    interval: isRangePeriodValue
      ? undefined
      : (periodStatement as PrivateStatsInterval),
    current: isCurrentDayIncluded,
  });
  const {
    data: statsByRangeData,
    isLoading: isLoadingStatsByRange,
    isFetching: isFetchingStatsByRange,
  } = useFetchUserStatsByRangeQuery({
    address,
    ...requestParams[periodStatement as CustomRange],
  });

  const { data: totalData, isLoading: isLoadingTotal } = useFetchUserTotalQuery(
    { address },
  );

  const currentClient = clients?.counters?.filter(
    client => client.address === address,
  );

  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const updateTimeframeParam = (
    timeframe: PrivateStatsInterval | CustomRange,
  ) => {
    setPeriodStatement(timeframe);
  };

  const handleSwitchCurrent = () => {
    setIsCurrentDayIncluded(!isCurrentDayIncluded);
  };

  return {
    isLoadingClients,
    currentClient,
    address,
    statsData: isRangePeriodValue ? statsByRangeData : statsData,
    isLoadingTransactions,
    isLoadingStats: isRangePeriodValue ? isLoadingStatsByRange : isLoadingStats,
    periodStatement,
    totalData,
    isLoadingTotal,
    value,
    handleChange,
    transactionsData,
    updateTimeframeParam,
    isFetchingStats: isRangePeriodValue
      ? isFetchingStatsByRange
      : isFetchingStats,
    handleSwitchCurrent,
    isCurrentDayIncluded,
    isRangePeriod: isRangePeriodValue,
  };
};
