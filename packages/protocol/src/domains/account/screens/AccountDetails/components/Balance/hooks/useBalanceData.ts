import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { BalanceData, EnoughMarker, EnoughTimePeriod } from '../types';
import { fetchBalance } from 'domains/account/actions/fetchBalance';

const mockedData: BalanceData = {
  ankrBalance: 44612.23,
  enoughMarker: EnoughMarker.GREEN,
  enoughTime: {
    value: 25,
    period: EnoughTimePeriod.Day,
  },
  usdtBalance: 4116.4,
};

export const useBalanceData = () => {
  const { data: ankrBalance, loading: isLoading } = useQuery({
    type: fetchBalance.toString(),
  });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  return { ...mockedData, ankrBalance, isLoading };
};
