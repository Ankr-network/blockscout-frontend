import { FieldValidator } from 'final-form';
import { useCallback } from 'react';

import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { validateAmount as validateUSDAmount } from 'domains/account/components/TopUp/USDTopUpForm/USDTopUpFormUtils';
import { validateAnkrAmount } from 'domains/account/components/TopUp/ANKRTopUpForm/utils/validateAnkrAmount';

export const useValidator = (isUSD: boolean) => {
  const { hasPrivateAccess, hasWeb3Connection } = useAuth();
  const { ankrBalance } = useAnkrBalanceOnWallet(hasWeb3Connection);
  const shouldValidate = !hasPrivateAccess;

  const ankrValidator: FieldValidator<string> = useCallback(
    value => validateAnkrAmount(value, shouldValidate, ankrBalance),
    [ankrBalance, shouldValidate],
  );

  return isUSD ? validateUSDAmount : ankrValidator;
};
