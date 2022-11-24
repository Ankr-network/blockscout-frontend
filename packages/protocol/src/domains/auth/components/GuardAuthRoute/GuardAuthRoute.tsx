import { Route } from 'react-router-dom';

import { useGuardAuth, IGuardRoute } from 'domains/auth/hooks/useGuardAuth';
import { Spinner } from 'ui';

export const GuardAuthRoute = ({
  hasCredentials,
  hasAuthData,
  isManualDisconnected,
  ...routeProps
}: IGuardRoute) => {
  const { loading } = useGuardAuth({
    hasCredentials,
    hasAuthData,
    isManualDisconnected,
  });

  if (loading) {
    return <Spinner />;
  }

  return <Route {...routeProps} />;
};
