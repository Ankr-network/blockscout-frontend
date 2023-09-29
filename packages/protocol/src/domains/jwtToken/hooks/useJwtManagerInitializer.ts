import { useEffect } from 'react';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
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

  const hasAccess = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerRead,
  });

  const shouldFetch =
    !skipFetching &&
    hasAccess &&
    !isEnterpriseClient &&
    !isLoadingEnterpriseStatus;

  useEffect(() => {
    if (shouldFetch) {
      fetch({ group });
    }
  }, [fetch, shouldFetch, group]);

  return useJwtManager();
};
