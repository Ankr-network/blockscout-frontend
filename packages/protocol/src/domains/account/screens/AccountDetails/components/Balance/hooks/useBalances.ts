import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { Balances as AccountBalances } from 'domains/account/actions/balance/types';
import { defaultBalances } from 'domains/account/actions/balance/const';
import { fetchBalances } from 'domains/account/actions/balance/fetchBalances';

export interface Balances extends AccountBalances {
  isLoading: boolean;
}

export const useBalances = (isConnected: boolean): Balances => {
  const {
    data: balances,
    loading,
    pristine,
  } = useQuery<AccountBalances>({
    defaultData: defaultBalances,
    type: fetchBalances.toString(),
  });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchBalances());
    }
  }, [dispatch, isConnected]);

  return { ...balances, isLoading: pristine && loading };
};
