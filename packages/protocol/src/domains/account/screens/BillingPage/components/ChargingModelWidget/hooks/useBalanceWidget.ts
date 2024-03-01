import { useAccountState } from 'domains/account/hooks/useAccountState';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { useMySubscriptions } from 'domains/account/hooks/useMySubscriptions';

export const useBalanceWidget = () => {
  const { isSubscribed: hasBundleSubscriptions } = useMyBundles({
    skipFetching: true,
  });

  const { isSubscribed: hasSubcriptions } = useMySubscriptions({
    skipFetching: true,
  });

  const {
    isOpened: isEditDialogOpened,
    onClose: onEditDialogClose,
    onOpen: onEdit,
  } = useDialog();

  const {
    isOpened: isUpgradeDialogOpened,
    onClose: onUpgradeDialogClose,
    onOpen: onTopUp,
  } = useUpgradePlanDialog();

  const { descriptionKey, isPAYG: hasPAYGLabel, status } = useAccountState();

  const hasDescription = Boolean(descriptionKey);

  return {
    hasBundleSubscriptions,
    hasDescription,
    hasPAYGLabel,
    hasSubcriptions,
    isEditDialogOpened,
    isUpgradeDialogOpened,
    onEdit,
    onEditDialogClose,
    onTopUp,
    onUpgradeDialogClose,
    status,
  };
};
