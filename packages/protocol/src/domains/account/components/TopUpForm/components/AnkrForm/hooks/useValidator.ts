import { useCallback } from 'react';

import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { validateAmount } from '../utils/validateAmount';

export const useValidator = () => {
  const { hasPrivateAccess, hasWeb3Connection, isOldPremium } = useAuth();

  const { ankrBalance: balance } = useAnkrBalanceOnWallet(hasWeb3Connection);
  const shouldValidateMinValue = isOldPremium || !hasPrivateAccess;

  return useCallback(
    (value: string) =>
      validateAmount({
        balance,
        shouldValidateMinValue,
        value,
      }),
    [balance, shouldValidateMinValue],
  );
};
