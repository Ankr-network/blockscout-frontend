import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { TActionPromise } from 'modules/common/types/ReduxRequests';
import { useCallback } from 'react';
import { AvailableProviders } from '../../api/ProviderManager/types';
import { connect, IConnect } from '../actions/connect';
import { disconnect } from '../actions/disconnect';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

interface IUseAuth extends IConnect {
  isLoading: boolean;
  dispatchConnect: () => TActionPromise<IConnect>;
  dispatchDisconnect: () => TActionPromise<IConnect>;
}

export const useAuth = (providerId: AvailableProviders): IUseAuth => {
  const dispatchRequest = useDispatchRequest();

  const { data, loading } = useQuery<IConnect | null>({
    type: connect,
    requestKey: getAuthRequestKey(providerId),
  });

  const dispatchConnect = useCallback(
    () => dispatchRequest(connect(providerId)),
    [providerId, dispatchRequest],
  );

  const dispatchDisconnect = useCallback(
    () => dispatchRequest(disconnect(providerId)),
    [providerId, dispatchRequest],
  );

  return {
    isConnected: !!data?.isConnected,
    address: data?.address,
    isLoading: loading,
    dispatchConnect,
    dispatchDisconnect,
  };
};
