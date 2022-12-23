import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useFetchSubscriptions } from './useFetchSubscriptions';
import { IMySubscriptionsResponse } from 'multirpc-sdk';

export interface Subscriptions {
  subscriptions: IMySubscriptionsResponse;
  isLoading: boolean;
}

export const useSubscriptions = (): Subscriptions => {
  const { credentials, isConnecting } = useAccountAuth();

  const [subscriptions, isLoading] = useFetchSubscriptions({
    hasCredentials: Boolean(credentials),
  });

  return {
    subscriptions,
    isLoading: isConnecting || isLoading,
  };
};
