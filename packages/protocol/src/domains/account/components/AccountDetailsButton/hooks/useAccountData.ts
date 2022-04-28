import BigNumber from 'bignumber.js';
import { stopPolling } from '@redux-requests/core';
import { useDispatch } from 'react-redux';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { AccountStatus } from 'domains/account/types';
import { Balances } from 'domains/account/actions/balance/types';
import { defaultBalances } from 'domains/account/actions/balance/const';
import { fetchBalances } from 'domains/account/actions/balance/fetchBalances';
import { useAuth } from 'modules/auth/hooks/useAuth';

export interface AccountData {
  balance: BigNumber;
  isLoading?: boolean;
  isVisible?: boolean;
  status: AccountStatus;
}

const mockedData: AccountData = {
  balance: defaultBalances.ankrBalance,
  status: AccountStatus.GREEN,
};

export const useAccountData = (): AccountData => {
  const { address } = useAuth();
  const isConnected = !!address;

  const {
    data: { ankrBalance: balance },
    loading,
    pristine,
  } = useQuery<Balances>({
    defaultData: defaultBalances,
    type: fetchBalances.toString(),
  });
  const isLoading = pristine && loading;

  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();
  useEffect(() => {
    if (isConnected) {
      dispatchRequest(fetchBalances());
    }

    return () => {
      dispatch(stopPolling([fetchBalances.toString()]));
    };
  }, [dispatch, dispatchRequest, isConnected]);

  return { ...mockedData, balance, isLoading, isVisible: isConnected };
};
