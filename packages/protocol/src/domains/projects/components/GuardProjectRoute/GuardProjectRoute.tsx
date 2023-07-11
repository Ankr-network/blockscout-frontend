import { ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router';

import { INDEX_PATH } from 'domains/chains/routes';
import { useJwtManager } from 'domains/jwtToken/hooks/useJwtManager';

export interface GuardProjectRouteProps {
  children: ReactNode;
}

export const GuardProjectRoute = ({ children }: GuardProjectRouteProps) => {
  const history = useHistory();

  const { hasReadAccess, isInitialized, loading } = useJwtManager();

  useEffect(() => {
    if (!hasReadAccess && isInitialized && !loading) {
      history.replace(INDEX_PATH);
    }
  }, [hasReadAccess, history, isInitialized, loading]);

  return hasReadAccess ? <>{children}</> : null;
};
