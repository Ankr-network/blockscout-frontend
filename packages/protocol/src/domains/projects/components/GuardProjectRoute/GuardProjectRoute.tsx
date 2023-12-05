import { ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useJwtManager } from 'domains/jwtToken/hooks/useJwtManager';

export interface GuardProjectRouteProps {
  children: ReactNode;
}

export const GuardProjectRoute = ({ children }: GuardProjectRouteProps) => {
  const history = useHistory();

  const { hasReadAccess, isInitialized, loading } = useJwtManager();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!hasReadAccess && isInitialized && !loading) {
      history.replace(ChainsRoutesConfig.chains.generatePath({ isLoggedIn }));
    }
  }, [hasReadAccess, history, isInitialized, isLoggedIn, loading]);

  return hasReadAccess ? <>{children}</> : null;
};
