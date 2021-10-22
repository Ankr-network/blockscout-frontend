import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { connect } from '../actions/connect';
import { useCallback } from 'react';
import { deposit } from '../actions/deposit';
import BigNumber from 'bignumber.js';
import { disconnect } from '../actions/disconnect';

const DEFAULT_DEPOSIT = new BigNumber(10_000);

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
    handleDeposit,
    loading: loadingConnect || loadingDisconnect,
    ...data,
  };
}
