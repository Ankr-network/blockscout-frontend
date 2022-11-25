import { stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { defaultBalance } from 'domains/account/actions/balance/const';
import { fetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { Balance as AccountBalance } from 'domains/account/actions/balance/types';

export interface Balance extends AccountBalance {
  isLoading: boolean;
  isLoadingInitially: boolean;
}

const actionType = fetchBalance.toString();

export const useBalance = (hasCredentials: boolean): Balance => {
  const { data: balances, loading: isLoading } = useQuery<AccountBalance>({
    type: actionType,
  });

  const isLoadingInitially = !balances && isLoading;

  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    if (hasCredentials) {
      dispatchRequest(fetchBalance());
    }

    return () => {
      dispatch(stopPolling([actionType]));
    };
  }, [dispatch, dispatchRequest, hasCredentials]);

  return { ...(balances || defaultBalance), isLoading, isLoadingInitially };
};
