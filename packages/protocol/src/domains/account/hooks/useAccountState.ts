import { useMemo } from 'react';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';

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

  const hasRolePermission = useGuardUserGroup({
    blockName: BlockWithPermission.AccountStatus,
  });

  return useMemo(
    () =>
      getAccountState({
        balance,
        balanceLevel,
        hasFreemium,
        hasPremium,
        hasRolePermission,
        hasTransition,
        premiumStatus,
      }),
    [
      balance,
      balanceLevel,
      hasFreemium,
      hasPremium,
      hasRolePermission,
      hasTransition,
      premiumStatus,
    ],
  );
};
