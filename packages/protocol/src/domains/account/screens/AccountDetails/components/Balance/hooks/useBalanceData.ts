import { BalanceData, EnoughTimePeriod, ServiceType } from '../types';
import { useAccountStatus } from 'domains/account/hooks/useAccountStatus';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useBalances } from 'domains/account/hooks/useBalances';

const mockedData: Pick<BalanceData, 'serviceType' | 'enoughTime'> = {
  serviceType: ServiceType.Premium,
  enoughTime: {
    value: 25,
    period: EnoughTimePeriod.Day,
  },
};

export const useBalanceData = (): BalanceData => {
  const { account, isConnected, isConnecting, premiumUntil } = useAuth();

  const {
    ankrBalance,
    usdBalance,
    isLoading: areBalancesLoading,
  } = useBalances(isConnected);
  const [status, isStatusLoading] = useAccountStatus({ account, isConnected });

  return {
    ...mockedData,
    ankrBalance,
    isLoading: isConnecting || areBalancesLoading || isStatusLoading,
    premiumUntil,
    status,
    usdBalance,
  };
};
