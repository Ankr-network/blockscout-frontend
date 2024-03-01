import { useCallback } from 'react';

import { useMySubscriptions } from 'domains/account/hooks/useMySubscriptions';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';

export const useEditSubscriptionsDialog = (onClose: () => void) => {
  const { subscriptions } = useMySubscriptions({ skipFetching: true });
  const isLastSubscription = subscriptions.length === 1;

  const {
    isOpened: isUpgradeDialogOpened,
    onClose: onUpgradeDialogClose,
    onOpen: onUpgradeSubscription,
  } = useUpgradePlanDialog();

  const onCancelSubscription = useCallback(() => {
    if (isLastSubscription) {
      onClose();
    }
  }, [onClose, isLastSubscription]);

  return {
    isUpgradeDialogOpened,
    onCancelSubscription,
    onUpgradeDialogClose,
    onUpgradeSubscription,
    subscriptions,
  };
};
