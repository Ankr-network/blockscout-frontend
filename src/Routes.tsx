import { Redirect, Route, Switch } from 'react-router-dom';

import { ChainsRoutes, ChainsRoutesConfig } from './domains/chains/Routes';
import {
  DashboardRoutes,
  DashboardRoutesConfig,
} from './domains/dashboard/Routes';
import { PlanRoutes, PlanRoutesConfig } from './domains/plan/Routes';
import {
  ProvidersRoutes,
  ProvidersRoutesConfig,
} from './domains/nodeProviders/Routes';

import { DefaultLayout } from './modules/layout/components/DefautLayout';
import { PageNotFound } from './modules/router/components/PageNotFound';
import { Themes } from './modules/themes/types';
import { useAuth } from './modules/auth/hooks/useAuth';
import { GuardAuthRoute } from './modules/auth/components/GuardAuthRoute';

export function Routes() {
  const { credentials } = useAuth();

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect
            to={
              credentials
                ? DashboardRoutesConfig.dashboard.path
                : ChainsRoutesConfig.chains.path
            }
          />
        )}
      />
      <GuardAuthRoute
        exact
        path={DashboardRoutesConfig.dashboard.path}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <DashboardRoutes />
          </DefaultLayout>
        )}
      />
      <Route
        exact
        path={[
          ChainsRoutesConfig.chains.path,
          ChainsRoutesConfig.chainDetails.path,
        ]}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <ChainsRoutes />
          </DefaultLayout>
        )}
      />
      <Route
        exact
        path={PlanRoutesConfig.plan.path}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <PlanRoutes />
          </DefaultLayout>
        )}
      />
      <Route
        exact
        path={[ProvidersRoutesConfig.providers.path]}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <ProvidersRoutes />
          </DefaultLayout>
        )}
      />
      <Route
        render={() => (
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        )}
      />
    </Switch>
  );
}
