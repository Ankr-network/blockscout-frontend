import { useEffect } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useLazyFetchAllowedJwtTokensCountQuery } from '../action/getAllowedJwtTokensCount';
import { useJwtManager } from './useJwtManager';
import { useEnterpriseClientStatus } from '../../auth/hooks/useEnterpriseClientStatus';

export const useJwtManagerInitializer = (shouldInitialize = true) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { isEnterpriseClient } = useEnterpriseClientStatus();
  const [fetch] = useLazyFetchAllowedJwtTokensCountQuery();

  useEffect(() => {
    if (shouldInitialize && !isEnterpriseClient) fetch({ group });
  }, [group, fetch, shouldInitialize, isEnterpriseClient]);

  return useJwtManager();
};
