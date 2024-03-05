import { useAccountState } from 'domains/account/hooks/useAccountState';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';

export const useBalanceWidget = () => {
  const { isSubscribed: hasBundleSubscriptions } = useMyBundles({
    skipFetching: true,
  });

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
    isUpgradeDialogOpened,
    onTopUp,
    onUpgradeDialogClose,
    status,
  };
};
