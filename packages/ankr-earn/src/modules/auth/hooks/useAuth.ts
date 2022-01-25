import { useDispatchRequest } from '@redux-requests/react';
import { BlockchainNetworkId } from 'modules/common/types';
import { TActionPromise } from 'modules/common/types/ReduxRequests';
import { AvailableProviders } from 'provider/providerManager/types';
import { useCallback } from 'react';
import { connect, IConnect } from '../actions/connect';
import { disconnect } from '../actions/disconnect';
import { IUseConnectedData, useConnectedData } from './useConnectedData';

interface IUseAuth extends IUseConnectedData {
  dispatchConnect: () => TActionPromise<IConnect>;
  dispatchDisconnect: () => TActionPromise<IConnect>;
}

export const useAuth = (
  providerId: AvailableProviders,
  availableNetworks: BlockchainNetworkId[],
): IUseAuth => {
  const dispatchRequest = useDispatchRequest();
  const data = useConnectedData(providerId);

  const dispatchConnect = useCallback(
    () => dispatchRequest(connect(providerId, availableNetworks)),
    [availableNetworks, dispatchRequest, providerId],
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
