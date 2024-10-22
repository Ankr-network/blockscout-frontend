import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useJwtManager } from './useJwtManager';
import { useAllowedJWTsCount } from './useAllowedJWTsCount';

export interface UseJwtManagerInitializerParams {
  skipFetching?: boolean;
}

export const useJwtManagerInitializer = ({
  skipFetching = false,
}: UseJwtManagerInitializerParams) => {
  const hasAccess = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerRead,
  });

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  useAllowedJWTsCount({
    group,
    skipFetching:
      skipFetching ||
      !hasAccess ||
      isEnterpriseClient ||
      isEnterpriseStatusLoading,
  });

  return useJwtManager();
};
