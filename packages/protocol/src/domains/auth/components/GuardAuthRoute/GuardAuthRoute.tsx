import { Route } from 'react-router-dom';

import { useGuardAuth, IGuardRoute } from 'domains/auth/hooks/useGuardAuth';
import { Spinner } from 'ui';

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
    return <Spinner />;
  }

  return <Route {...routeProps} />;
};
