import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { useAppSelector } from 'store/useAppSelector';
import { ChainsRoutes, ChainsRoutesConfig } from './domains/chains/Routes';
import { PlanRoutes, PlanRoutesConfig } from './domains/plan/Routes';
import {
  ProvidersRoutes,
  ProvidersRoutesConfig,
} from './domains/nodeProviders/Routes';

import { DefaultLayout } from './modules/layout/components/DefautLayout';
import { PageNotFound } from './modules/router/components/PageNotFound';
import { Themes } from 'ui';
import { useAuth } from './modules/auth/hooks/useAuth';
import { GuardAuthRoute } from './modules/auth/components/GuardAuthRoute';
import { selectCredentials } from 'modules/user/userSlice';

export function Routes() {
  const { handleConnect } = useAuth();

  const cachedCredentials = useAppSelector(selectCredentials);

  useEffect(() => {
    if (cachedCredentials) {
      handleConnect();
    }
  }, [handleConnect, cachedCredentials]);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect
            to={
              cachedCredentials
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
        path={[PlanRoutesConfig.plan.path, PlanRoutesConfig.planDeposit.path]}
        hasCachedCredentials={Boolean(cachedCredentials)}
        render={() => (
          <DefaultLayout isPremiumPlanPage disableGutters theme={Themes.light}>
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
