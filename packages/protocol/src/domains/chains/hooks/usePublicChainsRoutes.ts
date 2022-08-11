import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { fetchPublicChains } from '../actions/fetchPublicChains';

export const usePublicChainsRoutes = () => {
  const dispatchRequest = useDispatchRequest();

  const { data, pristine } = useQuery({
    type: fetchPublicChains.toString(),
    action: fetchPublicChains,
  });

  useEffect(() => {
    if (pristine) {
      dispatchRequest(fetchPublicChains());
    }
  }, [dispatchRequest, pristine]);

  return (data || [])?.map(item => item?.id);
};
