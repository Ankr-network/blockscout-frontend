// @ts-nocheck
import { useEffect } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import {
  selectMyBundlesStatus,
  selectMyBundlesStatusFetching,
  selectMyBundlesStatusLoading,
  selectMyCurrentBundleRequestsUsed,
} from '../store/selectors';
import { useLazyFetchMyBundlesStatusQuery } from '../actions/bundles/fetchMyBundlesStatus';
import { useEnterpriseClientStatus } from '../../auth/hooks/useEnterpriseClientStatus';

export interface MyBundlesStatusParams {
  skipFetching?: boolean;
}

export const useMyBundlesStatus = ({
  skipFetching = false,
}: MyBundlesStatusParams | void = {}) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const [fetch] = useLazyFetchMyBundlesStatusQuery();

  useEffect(() => {
    if (!skipFetching && !isEnterpriseClient && !isEnterpriseStatusLoading) {
      const { unsubscribe } = fetch(group);

      return unsubscribe;
    }

    return () => {};
  }, [
    fetch,
    group,
    skipFetching,
    isEnterpriseClient,
    isEnterpriseStatusLoading,
  ]);

  const statuses = useAppSelector(selectMyBundlesStatus);

  const loading = useAppSelector(selectMyBundlesStatusLoading);
  const fetching = useAppSelector(selectMyBundlesStatusFetching);
  const requestsUsed = useAppSelector(selectMyCurrentBundleRequestsUsed);

  return { fetching, loading, requestsUsed, statuses };
};
