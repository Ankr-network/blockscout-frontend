import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { addNetwork } from '../actions/addNetwork';

export function useAddNetwork() {
  const dispatchRequest = useDispatchRequest();

  const handleAddNetwork = useCallback(
    chainParams => {
      dispatchRequest(addNetwork(chainParams));
    },
    [dispatchRequest],
  );

  return {
    handleAddNetwork,
  };
}
