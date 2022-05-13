import { useCallback, useState } from 'react';

import { Balance } from 'domains/account/actions/balance/types';
import { BalanceData, EnoughTime, EnoughTimePeriod } from '../types';
import { Currency } from 'domains/account/types';
import { useAccountStatus } from 'domains/account/hooks/useAccountStatus';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';

type BalanceMap = Record<
  Currency,
  keyof Omit<Balance, 'isLoading' | 'usdBalance'>
>;

const enoughTime: EnoughTime = {
  period: EnoughTimePeriod.Day,
  value: 25,
};

const balancesMap: BalanceMap = {
  [Currency.ANKR]: 'ankrBalance',
  [Currency.CREDIT]: 'creditBalance',
};

export const useBalanceData = (): BalanceData => {
  const { isConnected, isConnecting, premiumUntil, tier } = useAuth();
  const [currency, setCurrency] = useState(Currency.ANKR);

  const { isLoading, usdBalance, ...balance } = useBalance(isConnected);

  const status = useAccountStatus({ balance: balance.ankrBalance });

  const onCurrencySwitch = useCallback((currency_: Currency) => {
    setCurrency(currency_);
  }, []);

  return {
    balance: balance[balancesMap[currency]],
    enoughTime,
    isLoading: isConnecting || isLoading,
    onCurrencySwitch,
    premiumUntil,
    status,
    tier,
    usdBalance,
  };
};
