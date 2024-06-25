import { ISubscriptionsItem } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';

import { isDealPlan } from 'domains/account/utils/isDealPlan';
import { isPackagePlan } from 'domains/account/utils/isPackagePlan';
import { selectBundlePaymentPlanByPriceId } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useCancelBundleSubscriptionMutation } from 'domains/account/actions/bundles/cancelBundleSubscription';
import { useCancelSubscriptionMutation } from 'domains/account/actions/subscriptions/cancelSubscription';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { TCancelSubscriptionHandler } from '../../../hooks/useEditSubscriptionsDialog';

export interface SubscriptionParams {
  onCancel: TCancelSubscriptionHandler;
  subscription: ISubscriptionsItem;
}

export const useSubscription = ({
  onCancel: onCancelSubscription,
  subscription,
}: SubscriptionParams) => {
  const [
    cancelSubscription,
    { error: cancelSubscriptionError, isLoading: isCancelingSubscription },
  ] = useCancelSubscriptionMutation();

  const [
    cancelBundleSubscription,
    {
      error: cancelBundleSubscriptionError,
      isLoading: isCancelingBundleSubscription,
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
  const isPackageBundle = Boolean(isPackagePlan(currentBundleData));

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
      onCancelSubscription(nextBillingDate, {
        isDeal: isDealBundle,
        isPackage: isPackageBundle,
      });
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
  };
};
