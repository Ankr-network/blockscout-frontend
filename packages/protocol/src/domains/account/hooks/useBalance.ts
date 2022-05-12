import { stopPolling } from '@redux-requests/core';
import { useDispatch } from 'react-redux';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { Balance as AccountBalance } from 'domains/account/actions/balance/types';
import { defaultBalance } from 'domains/account/actions/balance/const';
import { fetchBalance } from 'domains/account/actions/balance/fetchBalance';

export interface Balance extends AccountBalance {
  isLoading: boolean;
}

const actionType = fetchBalance.toString();

export const useBalance = (isConnected: boolean): Balance => {
  const {
    data: balances,
    loading,
    pristine,
  } = useQuery<AccountBalance>({
    defaultData: defaultBalance,
    type: actionType,
  });

  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    if (isConnected) {
      dispatchRequest(fetchBalance());
    }

    return () => {
      dispatch(stopPolling([actionType]));
    };
  }, [dispatch, dispatchRequest, isConnected]);

  return { ...balances, isLoading: pristine && loading };
};
