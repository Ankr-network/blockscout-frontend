import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { AvailableWriteProviders } from 'provider';

import { disconnect } from '../actions/disconnect';

const PROVIDERS_ARRAY = Object.values(AvailableWriteProviders);

type TDisconnectAll = () => void;

export const useDisconnectAll = (): TDisconnectAll => {
  const dispatchRequest = useDispatchRequest();

  return useCallback(() => {
    PROVIDERS_ARRAY.forEach(x => dispatchRequest(disconnect(x)));
  }, [dispatchRequest]);
};
