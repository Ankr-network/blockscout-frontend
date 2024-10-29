import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useJWTManagerPermissions } from 'domains/jwtToken/hooks/useJWTManagerPermissions';

export const useDashboardProjects = () => {
  const { hasReadAccess } = useJWTManagerPermissions();
  const { isEnterpriseClient } = useEnterpriseClientStatus();

  return { shouldShowTokenManager: isEnterpriseClient || hasReadAccess };
};
