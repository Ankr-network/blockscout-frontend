import { useEffect } from 'react';

import { useLazyFetchIsEnterpriseClientQuery } from 'domains/enterprise/actions/fetchIsEnterpriseClient';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useEnterpriseStatusFetch = (shouldInitialize: boolean) => {
  const [fetchEnterpriseStatus, { data }] =
    useLazyFetchIsEnterpriseClientQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useEffect(() => {
    if (shouldInitialize) {
      fetchEnterpriseStatus({ group });
    }
  }, [fetchEnterpriseStatus, shouldInitialize, group]);

  return {
    isEnterpriseClient: data,
  };
};
