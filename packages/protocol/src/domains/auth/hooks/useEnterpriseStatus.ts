import { useEffect } from 'react';

import { useLazyFetchIsEnterpriseClientQuery } from 'domains/enterprise/actions/fetchIsEnterpriseClient';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useEnterpriseStatusFetch = (shouldInitialize: boolean) => {
  const [fetchEnterpriseStatus, { data, isLoading, isUninitialized }] =
    useLazyFetchIsEnterpriseClientQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useEffect(() => {
    if (shouldInitialize && isUninitialized) {
      fetchEnterpriseStatus({ group });
    }
  }, [fetchEnterpriseStatus, shouldInitialize, group, data, isUninitialized]);

  return {
    isEnterpriseClient: data,
    isEnterpriseStatusLoading: isLoading || isUninitialized,
  };
};
