import { ISubscriptionsItem } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { selectIsMyBundleBySubscriptionId } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCancelBundleSubscriptionMutation } from 'domains/account/actions/bundles/cancelBundleSubscription';
import { useFetchSubscriptions } from './useFetchSubscriptions';
import { useLazyCancelSubscriptionQuery } from 'domains/account/actions/subscriptions/cancelSubscription';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useSubscriptions = (currentSubscription?: ISubscriptionsItem) => {
  const { hasPremium, loading: isConnecting } = useAuth();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [, subscriptionsResponse, subscriptionsLoading] = useFetchSubscriptions(
    { hasPremium },
  );

  const { bundles, loading: bundlesLoading } = useMyBundles({
    shouldFetch: true,
  });

  const subscriptions = useMemo(
    () => [...(subscriptionsResponse?.items ?? []), ...bundles],
    [subscriptionsResponse, bundles],
  );

  const [cancelSubscriptionInternal] = useLazyCancelSubscriptionQuery();
  const [cancelBundleSubscription] = useCancelBundleSubscriptionMutation();

  const isBundle = useAppSelector(state =>
    selectIsMyBundleBySubscriptionId(
      state,
      currentSubscription?.subscriptionId,
    ),
  );

  const cancelSubscription = useCallback(
    async (subscriptionId: string) => {
      if (isBundle) {
        await cancelBundleSubscription({
          params: { subscriptionId, group },
        });
      } else {
        await cancelSubscriptionInternal({
          params: { subscriptionId, group },
        });
      }
    },
    [cancelBundleSubscription, cancelSubscriptionInternal, group, isBundle],
  );

  const loading = isConnecting || subscriptionsLoading || bundlesLoading;

  return { cancelSubscription, loading, subscriptions };
};
