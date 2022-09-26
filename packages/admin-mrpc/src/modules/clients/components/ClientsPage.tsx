import { Spinner } from 'ui';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useFetchCountersQuery } from '../actions/fetchCounters';
import { ClientsTable } from './ClientsTable';

export const ClientsPage = () => {
  useSetBreadcrumbs([
    {
      title: 'clients',
    },
  ]);

  const { data, isLoading } = useFetchCountersQuery();

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
