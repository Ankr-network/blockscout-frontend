import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { BlockchainNetworkId } from 'modules/common/types';
import { TActionPromise } from 'modules/common/types/ReduxRequests';
import { AvailableProviders } from 'provider/providerManager/types';
import { useCallback } from 'react';
import { connect, IConnect } from '../actions/connect';
import { disconnect } from '../actions/disconnect';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

interface IUseAuth {
  isConnected: boolean;
  isLoading: boolean;
  address?: string;
  dispatchConnect: () => TActionPromise<IConnect>;
  dispatchDisconnect: () => TActionPromise<IConnect>;
  chainId?: BlockchainNetworkId;
  walletName?: string;
  walletIcon?: string;
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
    chainId: data?.chainId,
    walletName: data?.walletName,
    walletIcon: data?.walletIcon,
    dispatchConnect,
    dispatchDisconnect,
  };
};
