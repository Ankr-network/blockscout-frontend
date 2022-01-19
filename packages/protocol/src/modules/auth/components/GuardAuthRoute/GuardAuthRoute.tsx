import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { DefaultLayout } from '../../../layout/components/DefautLayout';
import { useAuth } from '../../hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { Dashboard } from 'domains/plan/screens/Dashboard';
import { Spinner } from 'ui';

export interface IGuardRoute extends RouteProps {
  hasCachedCredentials: boolean;
}

export const GuardAuthRoute = ({
  hasCachedCredentials,
  ...routeProps
}: IGuardRoute) => {
  const { credentials, address, loading } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();

  useOnMount(() => {
    if (!address || !credentials) setBreadcrumbs([]);
  });

  if (loading && hasCachedCredentials && typeof credentials === 'undefined') {
    return (
      <DefaultLayout>
        <Spinner />
      </DefaultLayout>
    );
  }

  if (credentials) {
    return (
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
