import { useState } from 'react';
import { PrivateStatsInterval } from 'multirpc-sdk';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';
import { useFetchCountersQuery } from 'modules/clients/actions/fetchCounters';
import { useFetchUserTransactionsQuery } from 'modules/clients/actions/fetchUserTransactions';
import { useFetchUserStatsQuery } from 'modules/clients/actions/fetchUserStats';
import { useFetchUserTotalQuery } from 'modules/clients/actions/fetchUserTotal';

const TRANSACTION_TYPE_DEDUCTION = 'TRANSACTION_TYPE_DEDUCTION';

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

  const { data: clients, isLoading: isLoadingClients } =
    useFetchCountersQuery();
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useFetchUserTransactionsQuery({ address });
  const {
    data: statsData,
    isLoading: isLoadingStats,
    isFetching: isFetchingStats,
  } = useFetchUserStatsQuery({ address, interval: periodStatement });
  const { data: totalData, isLoading: isLoadingTotal } = useFetchUserTotalQuery(
    { address },
  );

  const transactionsDeduction = transactionsData?.transactions.filter(
    transaction => transaction.type === TRANSACTION_TYPE_DEDUCTION,
  );
  const transactionsCost = transactionsDeduction?.reduce(
    (partialSum, transaction) => partialSum + +transaction.amountUsd,
    0,
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

  return {
    isLoadingClients,
    currentClient,
    address,
    statsData,
    transactionsCost,
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
  };
};
