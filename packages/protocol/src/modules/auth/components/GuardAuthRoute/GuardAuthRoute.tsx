import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { DefaultLayout } from '../../../layout/components/DefautLayout';
import { useAuth } from '../../hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { Dashboard } from 'domains/plan/screens/Dashboard';
import { Plan } from 'domains/plan/screens/Plan';

export interface IGuardRoute extends RouteProps {}

export const GuardAuthRoute = ({ ...routeProps }: IGuardRoute) => {
  const { credentials, address } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();

  useOnMount(() => {
    if (!address || !credentials) setBreadcrumbs([]);
  });

  if (!address || !credentials) {
    return (
      <DefaultLayout>
        <Plan />
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
