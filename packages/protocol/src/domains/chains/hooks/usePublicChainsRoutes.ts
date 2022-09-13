import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { fetchPublicChains } from '../actions/fetchPublicChains';

export const usePublicChainsRoutes = () => {
  const dispatchRequest = useDispatchRequest();

  const {
    data: { chains = [] },
    pristine,
  } = useQuery({
    type: fetchPublicChains.toString(),
    action: fetchPublicChains,
    defaultData: {},
  });

  useEffect(() => {
    if (pristine) {
      dispatchRequest(fetchPublicChains());
    }
  }, [dispatchRequest, pristine]);

  return chains.map(item => item?.id);
};
