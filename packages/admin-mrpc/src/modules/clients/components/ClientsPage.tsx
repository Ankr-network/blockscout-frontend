import { Spinner } from 'ui';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ClientsTable } from './ClientsTable';
import { useLazyFetchClients } from '../hooks/useLazyFetchClients';

export const ClientsPage = () => {
  useSetBreadcrumbs([
    {
      title: 'clients',
    },
  ]);

  const { data, isLoading } = useLazyFetchClients();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : data?.counters ? (
        <>
          <ClientsTable clients={data.counters} />
        </>
      ) : (
        'No data'
      )}
    </>
  );
};
