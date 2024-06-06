import { Route, RouteProps } from 'react-router-dom';
import { OverlaySpinner } from '@ankr.com/ui';

import { useGuardAuth } from 'domains/auth/hooks/useGuardAuth';

interface GuardAuthRouteProps extends RouteProps {
  hasReactSnapCheck?: boolean;
}

export const GuardAuthRoute = ({
  hasReactSnapCheck,
  ...routeProps
}: GuardAuthRouteProps) => {
  const { hasAuthData, loading } = useGuardAuth();

  if (loading) {
    return <OverlaySpinner />;
  }

  return hasAuthData || hasReactSnapCheck ? <Route {...routeProps} /> : null;
};
