// @ts-nocheck
import { useEffect, useMemo } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import {
  selectHasMyBundles,
  selectMyBundles,
  selectMyBundlesFetching,
  selectMyBundlesLoaded,
  selectMyBundlesLoading,
  selectMyCurrentBundle,
} from 'domains/account/store/selectors';
import { useLazyFetchMyBundlesQuery } from 'domains/account/actions/bundles/fetchMyBundles';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

export interface MyBundlesParams {
  skipFetching?: boolean;
}

const defaultOptions: SubscriptionOptions = {
  pollingInterval: 30_000,
};

export const useMyBundles = ({
  skipFetching = false,
}: MyBundlesParams | void = {}) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { isLoggedIn } = useAuth();
  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const shouldFetch = useMemo(
    () =>
      isLoggedIn &&
      !skipFetching &&
      !isEnterpriseClient &&
      !isEnterpriseStatusLoading,
    [isEnterpriseClient, isEnterpriseStatusLoading, isLoggedIn, skipFetching],
  );

  const [fetch] = useLazyFetchMyBundlesQuery(defaultOptions);

  useEffect(() => {
    if (shouldFetch) {
      const { unsubscribe } = fetch({ group });

      return unsubscribe;
    }

    return () => {};
  }, [fetch, shouldFetch, group]);

  const bundles = useAppSelector(selectMyBundles);
  const currentBundle = useAppSelector(selectMyCurrentBundle);

  const fetching = useAppSelector(selectMyBundlesFetching);
  const isLoaded = useAppSelector(selectMyBundlesLoaded);
  const isSubscribed = useAppSelector(selectHasMyBundles);
  const loading = useAppSelector(selectMyBundlesLoading);

  return { bundles, currentBundle, fetching, isLoaded, isSubscribed, loading };
};
