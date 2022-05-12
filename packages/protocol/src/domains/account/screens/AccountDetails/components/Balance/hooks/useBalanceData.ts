import { BalanceData, EnoughTime, EnoughTimePeriod } from '../types';
import { useAccountStatus } from 'domains/account/hooks/useAccountStatus';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';

const enoughTime: EnoughTime = {
  period: EnoughTimePeriod.Day,
  value: 25,
};

export const useBalanceData = (): BalanceData => {
  const { isConnected, isConnecting, premiumUntil, tier } = useAuth();

  const {
    ankrBalance,
    usdBalance,
    isLoading: areBalancesLoading,
  } = useBalance(isConnected);

  const status = useAccountStatus({ balance: ankrBalance });

  return {
    ankrBalance,
    enoughTime,
    isLoading: isConnecting || areBalancesLoading,
    premiumUntil,
    status,
    tier,
    usdBalance,
  };
};
