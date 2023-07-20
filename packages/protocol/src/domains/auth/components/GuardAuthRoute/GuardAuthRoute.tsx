import { Route, RouteProps } from 'react-router-dom';
import { OverlaySpinner } from '@ankr.com/ui';

import { useGuardAuth } from 'domains/auth/hooks/useGuardAuth';

interface GuardAuthRouteProps extends RouteProps {}

export const GuardAuthRoute = ({ ...routeProps }: GuardAuthRouteProps) => {
  const { loading, hasAuthData } = useGuardAuth();

  if (loading) {
    return <OverlaySpinner />;
  }

  return hasAuthData ? <Route {...routeProps} /> : null;
};
