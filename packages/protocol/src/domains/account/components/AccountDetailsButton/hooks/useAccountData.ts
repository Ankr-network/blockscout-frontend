import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { AccountType, BalanceStatus } from 'domains/account/types';
import { getAccountType } from 'domains/account/utils/getAccountType';
import { getBalanceStatus } from 'domains/account/utils/getBalanceStatus';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useBalanceEndTime } from 'domains/account/hooks/useBalanceEndTime';

export interface AccountData {
  accountType: AccountType;
  balance: BigNumber;
  hasStatusTransition: boolean;
  isLoading?: boolean;
  status: BalanceStatus;
}

export const useAccountData = (): AccountData => {
  const {
    hasFreeToPremiumTransition,
    hasPremium,
    hasPremiumToFreeTransition,
    hasPrivateAccess,
    hasStatusTransition,
    isFreePremium,
    isOldPremium,
    isTokenExpired,
    loading: isConnecting,
  } = useAuth();

  const { creditBalance: balance, isLoadingInitially: isBalanceLoading } =
    useBalance();

  const { endTime: balanceEndTime, isLoading: isBalanceEndTimeLoading } =
    useBalanceEndTime(hasPrivateAccess);

  const accountType = useMemo(
    () =>
      getAccountType({
        balance,
        balanceEndTime,
        hasFreeToPremiumTransition,
        hasPremium,
        hasPremiumToFreeTransition,
        isFreePremium,
        isOldPremium,
        isTokenExpired,
      }),
    [
      balance,
      balanceEndTime,
      hasFreeToPremiumTransition,
      hasPremium,
      hasPremiumToFreeTransition,
      isFreePremium,
      isOldPremium,
      isTokenExpired,
    ],
  );

  const status = getBalanceStatus(accountType);

  const isLoading = isBalanceLoading || isConnecting || isBalanceEndTimeLoading;

  return { accountType, balance, hasStatusTransition, isLoading, status };
};
