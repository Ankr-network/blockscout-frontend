import { Balance } from 'domains/account/actions/balance/types';
import { BalanceData } from '../types';
import { Currency } from 'domains/account/types';
import { getBalanceStatus } from 'domains/account/utils/getBalanceStatus';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useBalanceEndTime } from 'domains/account/hooks/useBalanceEndTime';
import { useCurrency } from './useCurrency';
import { useAccountType } from './useAccountType';

type BalanceMap = Record<
  Currency,
  keyof Omit<Balance, 'isLoading' | 'usdBalance'>
>;

const balancesMap: BalanceMap = {
  [Currency.ANKR]: 'ankrBalance',
  [Currency.CREDIT]: 'creditBalance',
};

export const useBalanceData = (): BalanceData => {
  const { isConnected, isConnecting, isNew, premiumUntil } = useAuth();

  const {
    isLoadingInitially: isBalanceLoading,
    usdBalance,
    ...balance
  } = useBalance(isConnected);

  const { endTime: balanceEndTime, isLoading: isBalanceEndTimeLoading } =
    useBalanceEndTime(isConnected);

  const [currency, switchCurrency] = useCurrency();

  const { accountType } = useAccountType(
    balance.ankrBalance,
    isNew,
    premiumUntil,
  );

  return {
    accountType,
    balance: balance[balancesMap[currency]],
    currency,
    balanceEndTime,
    isLoading: isConnecting || isBalanceLoading || isBalanceEndTimeLoading,
    premiumUntil,
    status: getBalanceStatus(accountType),
    switchCurrency,
    usdBalance,
  };
};
