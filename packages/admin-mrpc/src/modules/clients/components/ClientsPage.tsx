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

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (data?.counters) {
    return (
      <>
        <ClientsTable clients={data.counters} />
      </>
    );
  }

  return <>No data</>;
};
