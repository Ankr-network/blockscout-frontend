import { useJwtManager } from 'domains/jwtToken/hooks/useJwtManager';

export const useDashboardProjects = () => {
  const { hasReadAccess: shouldShowTokenManager } = useJwtManager();

  return { shouldShowTokenManager };
};
