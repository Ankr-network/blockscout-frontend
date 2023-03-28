import { ISubscriptionsResponse } from 'multirpc-sdk';
import { useCallback } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useFetchSubscriptions } from './useFetchSubscriptions';
import { useLazyCancelSubscriptionQuery } from 'domains/account/utils/cancelSubscription';

export interface IUseSubscriptions {
  subscriptions: ISubscriptionsResponse;
  isLoading: boolean;
  cancelSubscription: (subscriptionId: string) => Promise<void>;
}

export const useSubscriptions = (): IUseSubscriptions => {
  const { hasPremium, loading: isConnecting } = useAuth();

  const [fetchSubscriptionsData, subscriptions, isLoading] =
    useFetchSubscriptions({
      hasPremium,
    });

  const [cancelSubscriptionInternal] = useLazyCancelSubscriptionQuery();

  const cancelSubscription = useCallback(
    async (subscriptionId: string) => {
      await cancelSubscriptionInternal(subscriptionId);
      fetchSubscriptionsData();
    },
    [cancelSubscriptionInternal, fetchSubscriptionsData],
  );

  return {
    cancelSubscription,
    isLoading: isConnecting || isLoading,
    subscriptions,
  };
};
