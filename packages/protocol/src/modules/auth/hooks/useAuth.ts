import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { connect } from '../actions/connect';
import { useCallback } from 'react';
import { deposit } from '../actions/deposit';
import { disconnect } from '../actions/disconnect';
import { addNetwork } from '../actions/addNetwork';
import { DEFAULT_DEPOSIT } from '../conts';

export function useAuth() {
  const dispatchRequest = useDispatchRequest();

  const handleConnect = useCallback(() => {
    dispatchRequest(connect());
  }, [dispatchRequest]);

  const handleDisconnect = useCallback(() => {
    dispatchRequest(disconnect());
  }, [dispatchRequest]);

  const handleDeposit = useCallback(() => {
    dispatchRequest(deposit(DEFAULT_DEPOSIT));
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

  const { loading: loadingDeposit } = useMutation({
    type: deposit.toString(),
  });

  return {
    handleConnect,
    handleDisconnect,
    handleDeposit,
    handleAddNetwork,
    loading: loadingConnect || loadingDisconnect || loadingDeposit,
    isWalletConnected: Boolean(data?.address),
    ...data,
  };
}
