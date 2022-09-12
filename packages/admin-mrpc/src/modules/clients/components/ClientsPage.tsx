import { Spinner } from 'ui';
import { useFetchCountersQuery } from '../actions/fetchCounters';
import { ClientsTable } from './ClientsTable';

export const ClientsPage = () => {
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
