import { useJwtManager } from 'domains/jwtToken/hooks/useJwtManager';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

export const useDashboardProjects = () => {
  const { hasReadAccess } = useJwtManager();
  const { isEnterpriseClient } = useEnterpriseClientStatus();

  return { shouldShowTokenManager: isEnterpriseClient || hasReadAccess };
};
