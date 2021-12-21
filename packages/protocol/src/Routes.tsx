import { Redirect, Route, Switch } from 'react-router-dom';

import { ChainsRoutes, ChainsRoutesConfig } from './domains/chains/Routes';
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
import { useEffect } from 'react';
import { hasUserLoggedIn } from './modules/common/utils/localStorage';

const ENABLE_AUTOCONNECT = true;

export function Routes() {
  const { handleConnect, credentials } = useAuth();

  useEffect(() => {
    /* reconnecting on rerender if user has logged in earlier for persisting session */
    if (ENABLE_AUTOCONNECT && hasUserLoggedIn()) {
      handleConnect();
    }
  }, [handleConnect]);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect
            to={
              credentials
                ? PlanRoutesConfig.plan.path
                : ChainsRoutesConfig.chains.path
            }
          />
        )}
      />
      <Route
        exact
        path={[
          ChainsRoutesConfig.chains.path,
          ChainsRoutesConfig.chainDetails.path,
        ]}
        render={() => (
          <DefaultLayout theme={Themes.light} withNoReactSnap={false}>
            <ChainsRoutes />
          </DefaultLayout>
        )}
      />
      <GuardAuthRoute
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
