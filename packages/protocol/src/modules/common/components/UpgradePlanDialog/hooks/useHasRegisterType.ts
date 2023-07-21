import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { UpgradePlanDialogType } from '../types';
import { checkRegisterType } from '../utils/checkRegisterType';

export const useHasRegisterType = (
  type?: UpgradePlanDialogType,
): type is UpgradePlanDialogType => {
  const { isLoggedIn } = useAuth();

  return useMemo(
    () => checkRegisterType({ isLoggedIn, type }),
    [isLoggedIn, type],
  );
};
