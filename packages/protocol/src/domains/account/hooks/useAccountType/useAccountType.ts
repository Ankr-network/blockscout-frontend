import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { getAccountType } from './getAccountType';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useAccountType = (balance: BigNumber) => {
  const {
    hasFreeToPremiumTransition,
    hasPremium,
    isFreePremium,
    isOldPremium,
    isTokenExpired,
    hasPremiumToFreeTransition,
  } = useAuth();

  return useMemo(
    () =>
      getAccountType({
        balance,
        hasFreeToPremiumTransition,
        hasPremium,
        isFreePremium,
        isOldPremium,
        isTokenExpired,
        hasPremiumToFreeTransition,
      }),
    [
      balance,
      hasFreeToPremiumTransition,
      hasPremium,
      isFreePremium,
      isOldPremium,
      isTokenExpired,
      hasPremiumToFreeTransition,
    ],
  );
};
