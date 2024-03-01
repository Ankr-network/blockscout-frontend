import { useCallback } from 'react';

import { useCancelBundleSubscriptionMutation } from 'domains/account/actions/bundles/cancelBundleSubscription';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useEditPlanDialog = (onClose: () => void) => {
  const { currentBundle } = useMyBundles({ skipFetching: true });

  const [cancelBundleSubscription, { isLoading: isCanceling }] =
    useCancelBundleSubscriptionMutation();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const {
    amount,
    currentPeriodEnd: nextBillingDate,
    recurringInterval: period,
    subscriptionId,
  } = currentBundle!;

  const onCancel = useCallback(async () => {
    await cancelBundleSubscription({ params: { group, subscriptionId } });

    onClose();
  }, [cancelBundleSubscription, group, onClose, subscriptionId]);

  return { amount, isCanceling, nextBillingDate, onCancel, period };
};
