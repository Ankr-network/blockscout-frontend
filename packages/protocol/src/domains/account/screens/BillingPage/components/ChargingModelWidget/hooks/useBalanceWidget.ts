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

  return {
    hasBundleSubscriptions,
    isUpgradeDialogOpened,
    onTopUp,
    onUpgradeDialogClose,
  };
};
