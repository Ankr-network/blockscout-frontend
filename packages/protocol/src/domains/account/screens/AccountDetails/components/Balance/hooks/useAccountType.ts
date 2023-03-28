import BigNumber from 'bignumber.js';
import { useMemo, useRef } from 'react';

import { getAccountType } from 'domains/account/utils/getAccountType';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBalanceEndTime } from 'domains/account/hooks/useBalanceEndTime';

export interface AccountTypeParams {
  ankrBalance: BigNumber;
  isConnected?: boolean;
}

export const useAccountType = ({
  ankrBalance: balance,
  isConnected = false,
}: AccountTypeParams) => {
  const {
    hasFreeToPremiumTransition,
    hasPremium,
    hasPremiumToFreeTransition,
    isFreePremium,
    isOldPremium,
    isTokenExpired,
  } = useAuth();

  const currentAnkrBalance = useRef(balance);
  const isBalanceChanged = useMemo(
    () => !balance.isEqualTo(currentAnkrBalance.current),
    [balance],
  );

  const { endTime: balanceEndTime } = useBalanceEndTime(
    isConnected,
    isBalanceChanged,
  );

  return useMemo(
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
};
