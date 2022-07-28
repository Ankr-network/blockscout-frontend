import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useHistory } from 'react-router';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { AccountRoutes } from 'domains/account/Routes';
import { Spinner } from 'ui';
import { PRICING_PATH } from 'domains/pricing/Routes';

export interface IGuardRoute extends RouteProps {
  isAuthorized: boolean;
}

export const GuardAuthRoute = ({
  isAuthorized,
  ...routeProps
}: IGuardRoute) => {
  const { isWalletConnected, credentials, address, loading } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();
  const history = useHistory();

  if (!isWalletConnected && !loading) {
    history.replace(PRICING_PATH);
  }

  useOnMount(() => {
    if (!address || !credentials) setBreadcrumbs([]);
  });

  if (loading) {
    return (
      <DefaultLayout>
        <Spinner />
      </DefaultLayout>
    );
  }

  if (isAuthorized) {
    return (
      <DefaultLayout>
        <AccountRoutes />
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
