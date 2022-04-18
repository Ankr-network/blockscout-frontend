import BigNumber from 'bignumber.js';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { AccountStatus } from 'modules/account/types';
import { BalanceData, EnoughTimePeriod, ServiceType } from '../types';
import { IRates, fetchRates } from 'modules/common/actions/fetchRates';
import { fetchBalance } from 'modules/account/actions/fetchBalance';
import { useAuth } from 'modules/auth/hooks/useAuth';

const mockedData: BalanceData = {
  ankrBalance: new BigNumber(44612.23),
  status: AccountStatus.GREEN,
  serviceType: ServiceType.Premium,
  enoughTime: {
    value: 25,
    period: EnoughTimePeriod.Day,
  },
  usdBalance: new BigNumber(4116.4),
};

// needs to turn premium subscription date into milliseconds from kiloseconds
const MILLISECONDS_COEFFICIENT = 1_000_000;

export const useBalanceData = (): BalanceData => {
  const { data: nullableBalance, loading: isBalanceLoading } =
    useQuery<BigNumber | null>({ type: fetchBalance.toString() });

  const { data: rates, loading: isUsdLoading } = useQuery<IRates | null>({
    type: fetchRates.toString(),
  });

  const ankrBalance = nullableBalance || new BigNumber(0);
  const usdBalance =
    rates?.ankrUsdt?.multipliedBy(ankrBalance) || new BigNumber(0);

  const { address, credentials, loading: isConnecting } = useAuth();
  const isConnected = !!address;
  const premiumUntil = credentials?.expires_at
    ? new Date(credentials.expires_at * MILLISECONDS_COEFFICIENT)
    : undefined;

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchBalance());
      dispatch(fetchRates());
    }
  }, [dispatch, isConnected]);

  const isLoading = isConnecting || isBalanceLoading || isUsdLoading;

  return {
    ...mockedData,
    ankrBalance,
    isLoading,
    premiumUntil,
    usdBalance,
  };
};
