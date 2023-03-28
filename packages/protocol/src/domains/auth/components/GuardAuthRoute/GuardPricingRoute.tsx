import { Route, RouteProps } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { PATH_ACCOUNT } from 'domains/account/Routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export interface IGuardRoute extends RouteProps {
  hasAuthData: boolean;
}

export const GuardPricingRoute = ({
  hasAuthData,
  ...routeProps
}: IGuardRoute) => {
  const { address } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();
  const history = useHistory();

  useEffect(() => {
    if (hasAuthData) {
      history.replace(PATH_ACCOUNT);
    }
  }, [history, hasAuthData]);

  useOnMount(() => {
    if (!address || !hasAuthData) setBreadcrumbs([]);
  });

  if (hasAuthData) {
    return null;
  }

  return <Route {...routeProps} />;
};
