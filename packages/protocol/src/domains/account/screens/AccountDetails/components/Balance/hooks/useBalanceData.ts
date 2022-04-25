import BigNumber from 'bignumber.js';

import { AccountStatus } from 'modules/account/types';
import { BalanceData, EnoughTimePeriod, ServiceType } from '../types';
import { useAuth } from './useAuth';
import { useAnkrBalance } from './useAnkrBalance';
import { useUsdBalance } from './useUsdBalance';

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

  const { balance: ankrBalance, isLoading: isAnkrBalanceLoading } =
    useAnkrBalance(isConnected);

  const { balance: usdBalance, isLoading: isUsdBalanceLoading } = useUsdBalance(
    isConnected,
    ankrBalance,
  );

  return {
    ...mockedData,
    ankrBalance,
    isLoading: isConnecting || isAnkrBalanceLoading || isUsdBalanceLoading,
    premiumUntil,
    usdBalance,
  };
};
