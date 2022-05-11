import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { Balance as AccountBalance } from 'domains/account/actions/balance/types';
import { defaultBalance } from 'domains/account/actions/balance/const';
import { fetchBalance } from 'domains/account/actions/balance/fetchBalance';

export interface Balance extends AccountBalance {
  isLoading: boolean;
}

export const useBalance = (isConnected: boolean): Balance => {
  const {
    data: balances,
    loading,
    pristine,
  } = useQuery<AccountBalance>({
    defaultData: defaultBalance,
    type: fetchBalance.toString(),
  });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchBalance());
    }
  }, [dispatch, isConnected]);

  return { ...balances, isLoading: pristine && loading };
};
