import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { connect } from '../actions/connect';
import { useCallback } from 'react';
import { deposit } from '../actions/deposit';
import BigNumber from 'bignumber.js';

const DEFAULT_DEPOSIT = new BigNumber(10_000);

export function useAuth() {
  const dispatchRequest = useDispatchRequest();

  const handleConnect = useCallback(() => {
    dispatchRequest(connect());
  }, [dispatchRequest]);

  const handleDeposit = useCallback(() => {
    dispatchRequest(deposit(DEFAULT_DEPOSIT));
  }, [dispatchRequest]);

  const { data } = useQuery({
    action: connect,
    type: connect.toString(),
  });

  return { handleConnect, handleDeposit, ...data };
}
