import { stopPolling } from '@redux-requests/core';
import { useDispatch } from 'react-redux';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { fetchAccountStatus } from '../actions/fetchAccountStatus';
import { AccountStatus } from 'multirpc-sdk';

const defaultStatus = AccountStatus.INACTIVE;
const actionType = fetchAccountStatus.toString();

export interface UseAccountParams {
  account?: string;
  isConnected: boolean;
}

export const useAccountStatus = ({
  isConnected,
  account,
}: UseAccountParams): [AccountStatus, boolean] => {
  const {
    data: status,
    loading,
    pristine,
  } = useQuery<AccountStatus>({
    defaultData: defaultStatus,
    type: actionType,
  });
  const isLoading = pristine && loading;

  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();
  useEffect(() => {
    if (account && isConnected) {
      dispatchRequest(fetchAccountStatus(account));
    }

    return () => {
      dispatch(stopPolling([actionType]));
    };
  }, [dispatch, dispatchRequest, account, isConnected]);

  return [status, isLoading];
};
