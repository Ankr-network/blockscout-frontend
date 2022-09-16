import { ClientsRoutesConfig } from '../../ClientsRoutesConfig';
import { useFetchCountersQuery } from '../../actions/fetchCounters';
import { useFetchUserTransactionsQuery } from '../../actions/fetchUserTransactions';

import { ClientTransactionsTable } from './ClientTransactionsTable';
import { ClientInfo } from './ClientInfo';

export const ClientDetailsPage = () => {
  const { address } = ClientsRoutesConfig.clientInfo.useParams();
  const { data: clients, isLoading: isLoadingClients } =
    useFetchCountersQuery();
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useFetchUserTransactionsQuery({ address });

  const currentClient = clients?.counters?.filter(i => i.address === address);

  if (isLoadingClients || isLoadingTransactions) {
    return <>Loading...</>;
  }

  if (!currentClient) {
    return <>Client not found</>;
  }

  return (
    <>
      <ClientInfo currentClient={currentClient} />
      {transactionsData?.transactions && (
        <ClientTransactionsTable
          transactions={transactionsData?.transactions}
        />
      )}
    </>
  );
};
