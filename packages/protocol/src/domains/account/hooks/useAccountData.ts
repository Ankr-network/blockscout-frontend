import { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { AccountType, BalanceStatus } from 'domains/account/types';
import { getBalanceStatus } from 'domains/account/utils/getBalanceStatus';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useAccountType } from './useAccountType';

export interface AccountData {
  accountType: AccountType;
  balance: BigNumber;
  hasStatusTransition: boolean;
  isLoading?: boolean;
  status: BalanceStatus;
}

export const useAccountData = (): AccountData => {
  const { hasStatusTransition, loading: isConnecting } = useAuth();

  const { creditBalance: balance, isLoadingInitially: isBalanceLoading } =
    useBalance();

  const accountType = useAccountType(balance);
  const status = useMemo(() => getBalanceStatus(accountType), [accountType]);

  return {
    accountType,
    balance,
    hasStatusTransition,
    isLoading: isBalanceLoading || isConnecting,
    status,
  };
};
