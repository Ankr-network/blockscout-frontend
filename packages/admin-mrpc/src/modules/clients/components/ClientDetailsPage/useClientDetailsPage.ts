import { useState } from 'react';
import { PrivateStatsInterval } from 'multirpc-sdk';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { useFetchCountersQuery } from 'modules/clients/actions/fetchCounters';
import { useFetchUserTransactionsQuery } from 'modules/clients/actions/fetchUserTransactions';
import { useFetchUserStatsQuery } from 'modules/clients/actions/fetchUserStats';
import { useFetchUserTotalQuery } from 'modules/clients/actions/fetchUserTotal';

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

  const [periodStatement, setPeriodStatement] = useState<PrivateStatsInterval>(
    PrivateStatsInterval.DAY,
  );

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
    interval: periodStatement,
    current: isCurrentDayIncluded,
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

  const updateTimeframeParam = (timeframe: PrivateStatsInterval) => {
    setPeriodStatement(timeframe);
  };

  const handleSwitchCurrent = () => {
    setIsCurrentDayIncluded(!isCurrentDayIncluded);
  };

  return {
    isLoadingClients,
    currentClient,
    address,
    statsData,
    isLoadingTransactions,
    isLoadingStats,
    periodStatement,
    totalData,
    isLoadingTotal,
    value,
    handleChange,
    transactionsData,
    updateTimeframeParam,
    isFetchingStats,
    handleSwitchCurrent,
    isCurrentDayIncluded,
  };
};
