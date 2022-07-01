import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { AccountRoutes } from 'domains/account/Routes';
import { Spinner } from 'ui';

export interface IGuardRoute extends RouteProps {
  isAuthorized: boolean;
}

export const GuardAuthRoute = ({
  isAuthorized,
  ...routeProps
}: IGuardRoute) => {
  const { credentials, address, loading } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();

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
