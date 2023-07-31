import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { useBalance } from './useBalance';
import { getAccountState } from '../utils/getAccountState';

export const useAccountState = () => {
  const { balanceLevel, creditBalance: balance } = useBalance({
    skipFetching: true,
  });

  const {
    hasPremium,
    isFreePremium: hasFreemium,
    hasStatusTransition: hasTransition,
    premiumStatus,
  } = useAuth();

  return useMemo(
    () =>
      getAccountState({
        balance,
        balanceLevel,
        hasFreemium,
        hasPremium,
        hasTransition,
        premiumStatus,
      }),
    [
      balance,
      balanceLevel,
      hasFreemium,
      hasPremium,
      hasTransition,
      premiumStatus,
    ],
  );
};
