import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { AvailableWriteProviders } from 'common';

import { trackConnect } from 'modules/analytics/tracking-actions/trackConnect';
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
  const connectedData = useConnectedData(providerId);

  const dispatchConnect = useCallback(() => {
    const result = dispatchRequest(connect(providerId));

    result.then(({ data, error }) => {
      if (!error && data) {
        trackConnect(data.address, data.walletName);
      }
    });

    return result;
  }, [dispatchRequest, providerId]);

  const dispatchDisconnect = useCallback(
    () => dispatchRequest(disconnect(providerId)),
    [providerId, dispatchRequest],
  );

  return {
    ...connectedData,
    dispatchConnect,
    dispatchDisconnect,
  };
};
