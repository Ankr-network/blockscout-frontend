import { Balance } from 'domains/account/actions/balance/types';
import { BalanceData } from '../types';
import { Currency } from 'domains/account/types';
import { getBalanceStatus } from 'domains/account/utils/getBalanceStatus';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useAccountType } from './useAccountType';
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
  const { isConnected, isConnecting, isNew, premiumUntil, hasPrivateAccess } =
    useAccountAuth();

  const {
    isLoadingInitially: isBalanceLoading,
    usdBalance,
    ...balance
  } = useBalance(hasPrivateAccess);

  const { endTime: balanceEndTime, isLoading: isBalanceEndTimeLoading } =
    useBalanceEndTime(isConnected);

  const [currency, switchCurrency] = useCurrency();

  const { accountType } = useAccountType(
    balance.ankrBalance,
    isNew,
    premiumUntil,
    isConnected,
  );

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
