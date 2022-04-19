import BigNumber from 'bignumber.js';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { fetchBalance } from 'modules/account/actions/fetchBalance';

export interface AnkrBalance {
  balance: BigNumber;
  isLoading: boolean;
}

export const useAnkrBalance = (isConnected: boolean): AnkrBalance => {
  const {
    data: balance,
    loading,
    pristine,
  } = useQuery<BigNumber | null>({
    type: fetchBalance.toString(),
  });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchBalance());
    }
  }, [dispatch, isConnected]);

  return {
    balance: balance || new BigNumber(0),
    isLoading: pristine && loading,
  };
};
