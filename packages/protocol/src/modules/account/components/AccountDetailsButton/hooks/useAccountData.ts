import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';
import BigNumber from 'bignumber.js';

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

  const { data: nullableBalance, loading: isLoading } = useQuery<BigNumber>({
    type: fetchBalance.toString(),
  });
  const balance = nullableBalance || new BigNumber(0);

  const dispatch = useDispatchRequest();
  useEffect(() => {
    if (isConnected) {
      dispatch(fetchBalance());
    }
  }, [dispatch, isConnected]);

  return { ...mockedData, balance, isLoading, isVisible: isConnected };
};
