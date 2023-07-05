import { Balance } from 'domains/account/actions/balance/types';
import { BalanceData } from '../screens/AccountDetails/components/Balance/types';
import { Currency } from 'domains/account/types';
import { getBalanceStatus } from 'domains/account/utils/getBalanceStatus';
import { useAccountType } from './useAccountType/useAccountType';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useCurrency } from '../screens/AccountDetails/components/Balance/hooks/useCurrency';

type BalanceMap = Record<
  Currency,
  keyof Omit<Balance, 'isLoading' | 'usdBalance'>
>;

const balancesMap: BalanceMap = {
  [Currency.ANKR]: 'ankrBalance',
  [Currency.CREDIT]: 'creditBalance',
};

export const useBalanceData = (): BalanceData => {
  const { loading: isConnecting, premiumUntil } = useAuth();

  const {
    isLoadingInitially: isBalanceLoading,
    usdBalance,
    ...balance
  } = useBalance();

  const [currency, switchCurrency] = useCurrency();

  const accountType = useAccountType(balance.creditBalance);

  return {
    accountType,
    balance: balance[balancesMap[currency]],
    creditBalance: balance.creditBalance,
    currency,
    isLoading: isConnecting || isBalanceLoading,
    premiumUntil,
    status: getBalanceStatus(accountType),
    switchCurrency,
    usdBalance,
  };
};
