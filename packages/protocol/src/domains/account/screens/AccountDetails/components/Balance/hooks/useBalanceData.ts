import { useCallback, useState } from 'react';

import { Balance } from 'domains/account/actions/balance/types';
import { BalanceData } from '../types';
import { Currency } from 'domains/account/types';
import { getAccountType } from 'domains/account/utils/getAccountType';
import { getBalanceStatus } from 'domains/account/utils/getBalanceStatus';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useBalanceEndTime } from 'domains/account/hooks/useBalanceEndTime';

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
  const [currency, setCurrency] = useState(Currency.ANKR);

  const { isLoading, usdBalance, ...balance } = useBalance(isConnected);

  const { endTime, isLoading: isBalanceEndTimeLoading } =
    useBalanceEndTime(isConnected);

  const onCurrencySwitch = useCallback((currency_: Currency) => {
    setCurrency(currency_);
  }, []);

  const accountType = getAccountType({
    balance: balance.ankrBalance,
    balanceEndTime: endTime,
    premiumUntil,
  });

  return {
    accountType,
    balance: balance[balancesMap[currency]],
    isLoading: isConnecting || isLoading || isBalanceEndTimeLoading,
    onCurrencySwitch,
    premiumUntil,
    status: getBalanceStatus(accountType),
    usdBalance,
  };
};
