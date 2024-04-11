import { ISubscriptionsItem } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';

import { useCancelSubscriptionMutation } from 'domains/account/actions/subscriptions/cancelSubscription';
import { useCancelBundleSubscriptionMutation } from 'domains/account/actions/bundles/cancelBundleSubscription';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAppSelector } from 'store/useAppSelector';
import { selectBundlePaymentPlanByPriceId } from 'domains/account/store/selectors';
import { isPackagePlan } from 'domains/account/utils/isPackagePlan';
import { isDealPlan } from 'domains/account/utils/isDealPlan';

export interface SubscriptionParams {
  onCancel: (expiresAt: string, isDeal: boolean) => void;
  subscription: ISubscriptionsItem;
}

export const useSubscription = ({
  onCancel: onCancelSubscription,
  subscription,
}: SubscriptionParams) => {
  const [
    cancelSubscription,
    { isLoading: isCancelingSubscription, error: cancelSubscriptionError },
  ] = useCancelSubscriptionMutation();

  const [
    cancelBundleSubscription,
    {
      isLoading: isCancelingBundleSubscription,
      error: cancelBundleSubscriptionError,
    },
  ] = useCancelBundleSubscriptionMutation();

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

  const isDealBundle = Boolean(isDealPlan(currentBundleData));
  const isPackageBundle = isPackagePlan(currentBundleData);

  const onCancel = useCallback(async () => {
    const cancelSubscriptionParams = {
      params: { group, subscriptionId },
    };

    let response;

    if (isDealBundle || isPackageBundle) {
      response = await cancelBundleSubscription(cancelSubscriptionParams);
    } else {
      response = await cancelSubscription(cancelSubscriptionParams);
    }

    if (!cancelSubscriptionError && !cancelBundleSubscriptionError) {
      onCancelSubscription(nextBillingDate, isDealBundle);
    }

    return response;
  }, [
    group,
    subscriptionId,
    isDealBundle,
    isPackageBundle,
    onCancelSubscription,
    nextBillingDate,
    cancelSubscriptionError,
    cancelBundleSubscriptionError,
    cancelBundleSubscription,
    cancelSubscription,
  ]);

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
    isCanceling: isCancelingSubscription || isCancelingBundleSubscription,
    nextBillingDate,
    onCancel,
    period,
    customChargingModelName,
    isDeprecatedModel: Boolean(isPackageBundle),
  };
};
