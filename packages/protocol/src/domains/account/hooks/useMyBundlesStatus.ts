import { useEffect, useMemo } from 'react';
import { SubscriptionOptions } from '@reduxjs/toolkit/dist/query/core/apiState';

import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import {
  selectMyBundlesStatus,
  selectMyBundlesStatusFetching,
  selectMyBundlesStatusInitLoading,
  selectMyBundlesStatusLoading,
  selectMyCurrentBundleRequestsUsed,
} from 'domains/account/store/selectors';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

import { useLazyFetchMyBundlesStatusQuery } from '../actions/bundles/fetchMyBundlesStatus';

export interface MyBundlesStatusParams {
  skipFetching?: boolean;
}

const defaultOptions: SubscriptionOptions = {
  pollingInterval: 30_000,
};

export const useMyBundlesStatus = ({
  skipFetching = false,
}: MyBundlesStatusParams | void = {}) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { isLoggedIn } = useAuth();
  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const [fetch] = useLazyFetchMyBundlesStatusQuery(defaultOptions);

  const shouldFetch = useMemo(
    () =>
      isLoggedIn &&
      !skipFetching &&
      !isEnterpriseClient &&
      !isEnterpriseStatusLoading,
    [isEnterpriseClient, isEnterpriseStatusLoading, isLoggedIn, skipFetching],
  );

  useEffect(() => {
    if (shouldFetch) {
      const { unsubscribe } = fetch({ group });

      return () => unsubscribe;
    }

    return () => {};
  }, [fetch, group, shouldFetch]);

  const statuses = useAppSelector(selectMyBundlesStatus);

  const loading = useAppSelector(selectMyBundlesStatusLoading);
  const initLoading = useAppSelector(selectMyBundlesStatusInitLoading);
  const fetching = useAppSelector(selectMyBundlesStatusFetching);
  const requestsUsed = useAppSelector(selectMyCurrentBundleRequestsUsed);

  return { fetching, initLoading, loading, requestsUsed, statuses };
};
