import { ISubscriptionsItem } from 'multirpc-sdk';
import { useCallback } from 'react';

import { useCancelSubscriptionMutation } from 'domains/account/actions/subscriptions/cancelSubscription';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export interface SubscriptionParams {
  onCancel?: () => void;
  subscription: ISubscriptionsItem;
}

export const useSubscription = ({
  onCancel: onCancelSubscription = () => {},
  subscription,
}: SubscriptionParams) => {
  const [cancelSubscription, { isLoading: isCanceling }] =
    useCancelSubscriptionMutation();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const {
    amount,
    currentPeriodEnd: nextBillingDate,
    recurringInterval: period,
    subscriptionId,
  } = subscription;

  const onCancel = useCallback(async () => {
    await cancelSubscription({ params: { group, subscriptionId } });

    onCancelSubscription();
  }, [cancelSubscription, group, onCancelSubscription, subscriptionId]);

  return { amount, isCanceling, nextBillingDate, onCancel, period };
};
