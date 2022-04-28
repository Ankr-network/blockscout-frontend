import BigNumber from 'bignumber.js';

import { AccountStatus } from 'domains/account/types';
import { BalanceData, EnoughTimePeriod, ServiceType } from '../types';
import { useAuth } from './useAuth';
import { useBalances } from './useBalances';

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

export const useBalanceData = (): BalanceData => {
  const { isConnected, isConnecting, premiumUntil } = useAuth();

  const { ankrBalance, usdBalance, isLoading } = useBalances(isConnected);

  return {
    ...mockedData,
    ankrBalance,
    isLoading: isConnecting || isLoading,
    premiumUntil,
    usdBalance,
  };
};
