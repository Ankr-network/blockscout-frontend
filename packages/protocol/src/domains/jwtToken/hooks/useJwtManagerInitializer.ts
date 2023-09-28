import { useEffect, useMemo } from 'react';

import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { fetchAllowedJwtTokensCount } from '../action/getAllowedJwtTokensCount';
import { useJwtManager } from './useJwtManager';

export interface UseJwtManagerInitializerParams {
  skipFetching?: boolean;
}

export const useJwtManagerInitializer = ({
  skipFetching = false,
}: UseJwtManagerInitializerParams) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isEnterpriseClient, isLoadingEnterpriseStatus } =
    useEnterpriseClientStatus();

  const [fetch, , reset] = useQueryEndpoint(fetchAllowedJwtTokensCount);

  useEffect(() => reset, [reset]);

  const shouldFetch = useMemo(
    () => !skipFetching && !isEnterpriseClient && !isLoadingEnterpriseStatus,
    [skipFetching, isEnterpriseClient, isLoadingEnterpriseStatus],
  );

  useEffect(() => {
    if (shouldFetch) {
      fetch({ group });
    }
  }, [fetch, shouldFetch, group]);

  return useJwtManager();
};
