import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { UpgradePlanDialogType } from '../types';
import { checkPremiumType } from '../utils/checkPremiumType';
import { useHasUserGroupDialog } from './useHasUserGroupDialog';

export const useHasPremiumType = (
  type?: UpgradePlanDialogType,
): type is UpgradePlanDialogType => {
  const { hasPremium, loading } = useAuth();

  const { isGroupSelected } = useSelectedUserGroup();

  const hasUserGroupDialog = useHasUserGroupDialog();

  return useMemo(
    () =>
      checkPremiumType({
        hasPremium,
        hasUserGroupDialog,
        isGroupSelected,
        loading,
        type,
      }),
    [hasPremium, hasUserGroupDialog, isGroupSelected, loading, type],
  );
};
