import { useCallback } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { fetchProvider } from 'domains/infrastructure/actions/fetchProvider';

export function useProvider() {
  const dispatchRequest = useDispatchRequest();

  const handleFetchProvider = useCallback(() => {
    return dispatchRequest(fetchProvider());
  }, [dispatchRequest]);

  const { data, loading } = useQuery({
    action: fetchProvider,
    type: fetchProvider.toString(),
  });

  return {
    handleFetchProvider,
    providerData: typeof data === 'string' ? null : data,
    loading,
  };
}
