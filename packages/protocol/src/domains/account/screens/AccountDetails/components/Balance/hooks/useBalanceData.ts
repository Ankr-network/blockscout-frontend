import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { AccountStatus } from 'modules/account/types';
import { BalanceData, EnoughTimePeriod } from '../types';
import { fetchBalance } from 'modules/account/actions/fetchBalance';
import { useAuth } from 'modules/auth/hooks/useAuth';
import BigNumber from 'bignumber.js';

const mockedData: BalanceData = {
  ankrBalance: 44612.23,
  status: AccountStatus.GREEN,
  enoughTime: {
    value: 25,
    period: EnoughTimePeriod.Day,
  },
  usdtBalance: 4116.4,
};

export const useBalanceData = (): BalanceData => {
  const { data: nullableBalance, loading: isBalanceLoading } = useQuery({
    type: fetchBalance.toString(),
  });
  const ankrBalance = nullableBalance || new BigNumber(0);

  const { address, loading: isConnecting } = useAuth();
  const isConnected = !!address;

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchBalance());
    }
  }, [dispatch, isConnected]);

  const isLoading = isConnecting || isBalanceLoading;

  return { ...mockedData, ankrBalance, isLoading };
};
