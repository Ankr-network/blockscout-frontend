import { ISubscriptionsResponse } from 'multirpc-sdk';
import { useCallback } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useFetchSubscriptions } from './useFetchSubscriptions';
import { useLazyCancelSubscriptionQuery } from 'domains/account/utils/cancelSubscription';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export interface IUseSubscriptions {
  subscriptions: ISubscriptionsResponse;
  isLoading: boolean;
  cancelSubscription: (subscriptionId: string) => Promise<void>;
}

export const useSubscriptions = (): IUseSubscriptions => {
  const { hasPremium, loading: isConnecting } = useAuth();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [fetchSubscriptionsData, subscriptions, isLoading] =
    useFetchSubscriptions({
      hasPremium,
    });

  const [cancelSubscriptionInternal] = useLazyCancelSubscriptionQuery();

  const cancelSubscription = useCallback(
    async (subscriptionId: string) => {
      await cancelSubscriptionInternal({ subscriptionId, group });
      fetchSubscriptionsData({ group });
    },
    [cancelSubscriptionInternal, fetchSubscriptionsData, group],
  );

  return {
    cancelSubscription,
    isLoading: isConnecting || isLoading,
    subscriptions,
  };
};
