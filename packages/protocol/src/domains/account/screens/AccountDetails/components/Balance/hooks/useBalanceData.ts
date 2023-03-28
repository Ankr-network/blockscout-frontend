import { Balance } from 'domains/account/actions/balance/types';
import { BalanceData } from '../types';
import { Currency } from 'domains/account/types';
import { getBalanceStatus } from 'domains/account/utils/getBalanceStatus';
import { useAccountType } from './useAccountType';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useBalanceEndTime } from 'domains/account/hooks/useBalanceEndTime';
import { useCurrency } from './useCurrency';

type BalanceMap = Record<
  Currency,
  keyof Omit<Balance, 'isLoading' | 'usdBalance'>
>;

const balancesMap: BalanceMap = {
  [Currency.ANKR]: 'ankrBalance',
  [Currency.CREDIT]: 'creditBalance',
};

export const useBalanceData = (): BalanceData => {
  const { isLoggedIn, loading: isConnecting, premiumUntil } = useAuth();
  const isConnected = isLoggedIn && !isConnecting;

  const {
    isLoadingInitially: isBalanceLoading,
    usdBalance,
    ...balance
  } = useBalance();

  const { endTime: balanceEndTime, isLoading: isBalanceEndTimeLoading } =
    useBalanceEndTime(isConnected);

  const [currency, switchCurrency] = useCurrency();

  const accountType = useAccountType({
    ankrBalance: balance.ankrBalance,
    isConnected,
  });

  return {
    accountType,
    balance: balance[balancesMap[currency]],
    balanceEndTime,
    currency,
    isLoading: isConnecting || isBalanceLoading || isBalanceEndTimeLoading,
    premiumUntil,
    status: getBalanceStatus(accountType),
    switchCurrency,
    usdBalance,
  };
};
