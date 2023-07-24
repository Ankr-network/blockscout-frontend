import { useEffect } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useLazyFetchAllowedJwtTokensCountQuery } from '../action/getAllowedJwtTokensCount';
import { useJwtManager } from './useJwtManager';

export const useJwtManagerInitializer = (shouldInitialize = true) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [fetch] = useLazyFetchAllowedJwtTokensCountQuery();

  useEffect(() => {
    if (shouldInitialize) fetch({ group });
  }, [group, fetch, shouldInitialize]);

  return useJwtManager();
};
