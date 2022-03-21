import { useCallback } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { fetchEndpoints } from 'domains/nodeProviders/actions/fetchEndpoints';

export function useEndpoints() {
  const dispatchRequest = useDispatchRequest();

  const handleFetchEndpoints = useCallback(() => {
    dispatchRequest(fetchEndpoints());
  }, [dispatchRequest]);

  const { data, loading } = useQuery({
    type: fetchEndpoints.toString(),
  });

  return {
    handleFetchEndpoints,
    endpoints: data,
    loading,
  };
}
