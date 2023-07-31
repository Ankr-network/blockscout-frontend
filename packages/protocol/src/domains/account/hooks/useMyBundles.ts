import { useEffect } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import {
  selectHasMyBundles,
  selectMyBundles,
  selectMyBundlesFetching,
  selectMyBundlesLoaded,
  selectMyBundlesLoading,
  selectMyCurrentBundle,
} from '../store/selectors';
import { useLazyFetchMyBundlesQuery } from '../actions/bundles/fetchMyBundles';

export interface MyBundlesParams {
  skipFetching?: boolean;
}

export const useMyBundles = ({
  skipFetching = false,
}: MyBundlesParams | void = {}) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [fetch] = useLazyFetchMyBundlesQuery();

  useEffect(() => {
    if (!skipFetching) {
      const { unsubscribe } = fetch(group);

      return unsubscribe;
    }

    return () => {};
  }, [fetch, group, skipFetching]);

  const bundles = useAppSelector(selectMyBundles);
  const currentBundle = useAppSelector(selectMyCurrentBundle);

  const fetching = useAppSelector(selectMyBundlesFetching);
  const isLoaded = useAppSelector(selectMyBundlesLoaded);
  const isSubscribed = useAppSelector(selectHasMyBundles);
  const loading = useAppSelector(selectMyBundlesLoading);

  return { bundles, currentBundle, fetching, isLoaded, isSubscribed, loading };
};
