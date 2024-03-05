import { BundleType, ISubscriptionsItem } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';

import { useCancelSubscriptionMutation } from 'domains/account/actions/subscriptions/cancelSubscription';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAppSelector } from 'store/useAppSelector';
import { selectBundlePaymentPlanByPriceId } from 'domains/account/store/selectors';

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

  const currentBundleData = useAppSelector(state =>
    selectBundlePaymentPlanByPriceId(state, subscription.productPriceId),
  );

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

  const isDealBundle =
    currentBundleData &&
    currentBundleData.bundle.limits.find(
      limit => limit.type === BundleType.COST,
    );

  const isPackageBundle =
    currentBundleData &&
    currentBundleData.bundle.limits.find(
      limit => limit.type === BundleType.QTY,
    );

  const customChargingModelName = useMemo(() => {
    if (isDealBundle) {
      return t('account.account-details.edit-subscriptions-dialog.deal');
    }

    if (isPackageBundle) {
      return t('account.account-details.edit-subscriptions-dialog.package');
    }

    return undefined;
  }, [isDealBundle, isPackageBundle]);

  return {
    amount,
    isCanceling,
    nextBillingDate,
    onCancel,
    period,
    customChargingModelName,
    isDeprecatedModel: Boolean(isPackageBundle),
  };
};
