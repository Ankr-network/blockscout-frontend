import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';
import { fetchGlossary } from './actions/fetchGlossary';
import { ResponseData } from 'api/utils/ResponseData';

export const useGlossaryLoading = () => {
  const dispatchRequest = useDispatchRequest();
  useEffect(() => {
    dispatchRequest(fetchGlossary());
  }, [dispatchRequest]);
};

export const useGlossaryData = () => {
  const { data, loading, error } = useQuery<ResponseData<typeof fetchGlossary>>(
    {
      type: fetchGlossary,
    },
  );

  return {
    data,
    loading,
    error,
  };
};
