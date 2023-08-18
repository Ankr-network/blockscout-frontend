import { useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { OverlaySpinner } from '@ankr.com/ui';

import { ClientsRoutesConfig } from 'modules/clients/ClientsRoutesConfig';

interface IGuardRoute extends RouteProps {
  hasSecretRouteAccess?: boolean;
  isLoading?: boolean;
}

export const GuardAdminRoute = ({
  hasSecretRouteAccess,
  isLoading,
  ...routeProps
}: IGuardRoute) => {
  const history = useHistory();

  useEffect(() => {
    if (!hasSecretRouteAccess && !isLoading) {
      history.replace(ClientsRoutesConfig.clients.generatePath());
    }
  }, [history, hasSecretRouteAccess, isLoading]);

  if (isLoading) {
    return <OverlaySpinner />;
  }

  return hasSecretRouteAccess ? <Route {...routeProps} /> : null;
};
