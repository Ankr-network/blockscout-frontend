import BigNumber from 'bignumber.js';
import { stopPolling } from '@redux-requests/core';
import { useDispatch } from 'react-redux';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { AccountStatus } from 'modules/account/types';
import { fetchBalance } from 'modules/account/actions/fetchBalance';
import { useAuth } from 'modules/auth/hooks/useAuth';

export interface AccountData {
  balance: BigNumber;
  isLoading?: boolean;
  isVisible?: boolean;
  status: AccountStatus;
}

const mockedData: AccountData = {
  balance: new BigNumber(0),
  status: AccountStatus.GREEN,
};

export const useAccountData = (): AccountData => {
  const { address } = useAuth();
  const isConnected = !!address;

  const {
    data: nullableBalance,
    loading,
    pristine,
  } = useQuery<BigNumber>({
    type: fetchBalance.toString(),
  });
  const balance = nullableBalance || new BigNumber(0);
  const isLoading = pristine && loading;

  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();
  useEffect(() => {
    if (isConnected) {
      dispatchRequest(fetchBalance());
    }

    return () => {
      dispatch(stopPolling([fetchBalance.toString()]));
    };
  }, [dispatch, dispatchRequest, isConnected]);

  return { ...mockedData, balance, isLoading, isVisible: isConnected };
};
