import { useEffect } from 'react';

import { useLazyFetchCountersQuery } from '../actions/fetchCounters';

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
