import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { AvailableWriteProviders } from 'provider';

import { TActionPromise } from 'modules/common/types/ReduxRequests';

import { connect, IConnect } from '../actions/connect';
import { disconnect } from '../actions/disconnect';

import { IUseConnectedData, useConnectedData } from './useConnectedData';

interface IUseAuth extends IUseConnectedData {
  dispatchConnect: () => TActionPromise<IConnect>;
  dispatchDisconnect: () => TActionPromise<IConnect>;
}

export const useAuth = (providerId: AvailableWriteProviders): IUseAuth => {
  const dispatchRequest = useDispatchRequest();
  const data = useConnectedData(providerId);

  const dispatchConnect = useCallback(
    () => dispatchRequest(connect(providerId)),
    [dispatchRequest, providerId],
  );

  const dispatchDisconnect = useCallback(
    () => dispatchRequest(disconnect(providerId)),
    [providerId, dispatchRequest],
  );

  return {
    ...data,
    dispatchConnect,
    dispatchDisconnect,
  };
};
