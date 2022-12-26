import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useFetchSubscriptions } from './useFetchSubscriptions';
import { ISubscriptionsResponse } from 'multirpc-sdk';
import { useLazyCancelSubscriptionQuery } from 'domains/account/utils/cancelSubscription';
import { useCallback } from 'react';

export interface Subscriptions {
  subscriptions: ISubscriptionsResponse;
  isLoading: boolean;
  cancelSubscription: (subscriptionId: string) => Promise<void>;
}

export const useSubscriptions = (): Subscriptions => {
  const { isConnecting, isConnected } = useAccountAuth();

  const [fetchSubscriptionsData, subscriptions, isLoading] =
    useFetchSubscriptions({
      isConnected,
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
    subscriptions,
    isLoading: isConnecting || isLoading,
    cancelSubscription,
  };
};
