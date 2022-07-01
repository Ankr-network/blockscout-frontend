import { useCallback } from 'react';

import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { connect } from '../actions/connect';
import { disconnect } from '../actions/disconnect';
import { addNetwork } from '../actions/addNetwork';

export function useAuth() {
  const dispatchRequest = useDispatchRequest();

  const handleConnect = useCallback(() => {
    dispatchRequest(connect());
  }, [dispatchRequest]);

  const handleDisconnect = useCallback(() => {
    dispatchRequest(disconnect());
  }, [dispatchRequest]);

  const handleAddNetwork = useCallback(
    chainParams => {
      dispatchRequest(addNetwork(chainParams));
    },
    [dispatchRequest],
  );

  const { data, loading: loadingConnect } = useQuery({
    action: connect,
    type: connect.toString(),
  });

  const { loading: loadingDisconnect } = useMutation({
    type: disconnect.toString(),
  });

  return {
    handleConnect,
    handleDisconnect,
    handleAddNetwork,
    loading: loadingConnect || loadingDisconnect,
    isWalletConnected: Boolean(data?.address),
    ...data,
  };
}
