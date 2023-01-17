import { Route } from 'react-router-dom';

import { useGuardAuth, IGuardRoute } from 'domains/auth/hooks/useGuardAuth';
import { OverlaySpinner } from '@ankr.com/ui';

export const GuardAuthRoute = ({
  hasPremium,
  hasAuthData,
  ...routeProps
}: IGuardRoute) => {
  const { loading } = useGuardAuth({
    hasPremium,
    hasAuthData,
  });

  if (loading) {
    return <OverlaySpinner />;
  }

  return hasAuthData ? <Route {...routeProps} /> : null;
};
