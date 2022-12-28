import { Route } from 'react-router-dom';

import { useGuardAuth, IGuardRoute } from 'domains/auth/hooks/useGuardAuth';
import { Spinner } from 'ui';

export const GuardAuthRoute = ({
  hasPremium,
  isManualDisconnected,
  hasAuthData,
  ...routeProps
}: IGuardRoute) => {
  const { loading } = useGuardAuth({
    hasPremium,
    isManualDisconnected,
    hasAuthData,
  });

  if (loading) {
    return <Spinner />;
  }

  return <Route {...routeProps} />;
};
