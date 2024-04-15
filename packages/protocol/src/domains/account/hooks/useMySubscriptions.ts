// @ts-nocheck
import { useEffect } from 'react';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import {
  selectAllMySubcriptionsAmount,
  selectHasMySubscriptions,
  selectMySubscriptions,
  selectMySubscriptionsFetching,
  selectMySubscriptionsLoading,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useLazyFetchMySubscriptionsQuery } from '../actions/subscriptions/fetchMySubscriptions';

export interface MySubscriptionsParams {
  skipFetching?: boolean;
}

const defaultOptions: SubscriptionOptions = {
  pollingInterval: 30_000,
};

export const useMySubscriptions = ({
  skipFetching = false,
}: MySubscriptionsParams | void = {}) => {
  const { hasPremium } = useAuth();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const hasAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Billing,
  });

  const shouldFetch = (hasPremium || hasAccess) && !skipFetching;

  const [fetch] = useLazyFetchMySubscriptionsQuery(defaultOptions);

  useEffect(() => {
    if (shouldFetch) {
      const { unsubscribe } = fetch({ group });

      return unsubscribe;
    }

    return () => {};
  }, [fetch, group, shouldFetch]);

  const allSubscriptionsAmount = useAppSelector(selectAllMySubcriptionsAmount);
  const fetching = useAppSelector(selectMySubscriptionsFetching);
  const isSubscribed = useAppSelector(selectHasMySubscriptions);
  const loading = useAppSelector(selectMySubscriptionsLoading);
  const subscriptions = useAppSelector(selectMySubscriptions);

  return {
    allSubscriptionsAmount,
    fetching,
    isSubscribed,
    loading,
    subscriptions,
  };
};
