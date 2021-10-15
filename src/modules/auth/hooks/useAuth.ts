import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { connect as connectAction } from '../actions/connect';
import { useCallback } from 'react';

export function useAuth() {
  const dispatchRequest = useDispatchRequest();

  const connect = useCallback(() => {
    dispatchRequest(connectAction());
  }, [dispatchRequest]);

  const { data } = useQuery({
    action: connectAction,
    type: connectAction.toString(),
  });

  return { connect, ...data };
}
