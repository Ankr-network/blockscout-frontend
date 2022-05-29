import { Balance } from 'domains/account/actions/balance/types';
import { BalanceData } from '../types';
import { Currency } from 'domains/account/types';
import { useAccountStatus } from 'domains/account/hooks/useAccountStatus';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';
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
  const { isConnected, isConnecting, premiumUntil } = useAuth();

  const { isLoading, usdBalance, ...balance } = useBalance(isConnected);

  const status = useAccountStatus({ balance: balance.ankrBalance });

  const [currency, switchCurrency] = useCurrency();

  return {
    balance: balance[balancesMap[currency]],
    currency,
    isLoading: isConnecting || isLoading,
    premiumUntil,
    status,
    switchCurrency,
    usdBalance,
  };
};
