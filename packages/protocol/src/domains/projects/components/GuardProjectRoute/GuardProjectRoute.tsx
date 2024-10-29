import { ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useJWTManagerPermissions } from 'domains/jwtToken/hooks/useJWTManagerPermissions';

export interface GuardProjectRouteProps {
  children: ReactNode;
}

export const GuardProjectRoute = ({ children }: GuardProjectRouteProps) => {
  const history = useHistory();

  const {
    allowedJWTsCountLoading,
    hasReadAccess,
    isAllowedJWTsCountInitialized,
  } = useJWTManagerPermissions();

  const { isLoggedIn } = useAuth();

  const shouldRedirect =
    !hasReadAccess && isAllowedJWTsCountInitialized && !allowedJWTsCountLoading;

  useEffect(() => {
    if (shouldRedirect) {
      history.replace(ChainsRoutesConfig.chains.generatePath({ isLoggedIn }));
    }
  }, [history, isLoggedIn, shouldRedirect]);

  return hasReadAccess ? <>{children}</> : null;
};
