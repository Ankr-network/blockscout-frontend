import { Route, RouteProps } from 'react-router-dom';
import { OverlaySpinner } from '@ankr.com/ui';

import {
  useGuardAuth,
  GuardAuthRouteParams,
} from 'domains/auth/hooks/useGuardAuth';

interface GuardAuthRouteProps extends GuardAuthRouteParams, RouteProps {}

export const GuardAuthRoute = ({
  hasPremium,
  hasAuthData,
  ...routeProps
}: GuardAuthRouteProps) => {
  const { loading } = useGuardAuth({
    hasPremium,
    hasAuthData,
  });

  if (loading) {
    return <OverlaySpinner />;
  }

  return hasAuthData ? <Route {...routeProps} /> : null;
};
