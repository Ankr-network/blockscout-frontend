import { useLazyFetchCountersQuery } from '../actions/fetchCounters';
import { useEffect } from 'react';

export const useLazyFetchClients = () => {
  const [fetchClients, { data, isLoading, isFetching, error }] =
    useLazyFetchCountersQuery();

  useEffect(() => {
    if (!data?.counters?.length) {
      fetchClients(undefined, true);
    }
  }, [data?.counters?.length, fetchClients]);

  return {
    fetchClients,
    data,
    isLoading,
    isFetching,
    error,
  };
};
