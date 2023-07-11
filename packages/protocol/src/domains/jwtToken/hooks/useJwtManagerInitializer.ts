import { useEffect } from 'react';
import { useLazyFetchAllowedJwtTokensCountQuery } from '../action/getAllowedJwtTokensCount';
import { useJwtManager } from './useJwtManager';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useJwtManagerInitializer = (shouldInitialize = true) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [fetch] = useLazyFetchAllowedJwtTokensCountQuery();

  useEffect(() => {
    if (shouldInitialize) fetch({ group });
  }, [group, fetch, shouldInitialize]);

  return useJwtManager();
};
