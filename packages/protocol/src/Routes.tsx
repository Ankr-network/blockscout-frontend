import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { useAppSelector } from 'store/useAppSelector';
import { ChainsRoutes, ChainsRoutesConfig } from './domains/chains/Routes';
import { PlanRoutes, PlanRoutesConfig } from './domains/plan/Routes';
import {
  ProvidersRoutes,
  ProvidersRoutesConfig,
} from './domains/nodeProviders/Routes';
import { AccountRoutes, AccountRoutesConfig } from './domains/account/Routes';
import {
  RequestExplorerRoutes,
  ExplorerRoutesConfig,
} from './domains/explorer/Routes';

import { DefaultLayout } from './modules/layout/components/DefautLayout';
import { PageNotFound } from './modules/router/components/PageNotFound';
import { Themes } from 'ui';
import { useAuth } from './modules/auth/hooks/useAuth';
import { GuardAuthRoute } from './modules/auth/components/GuardAuthRoute';
import { selectAuthData } from 'modules/auth/store/authSlice';
import { GuardProviderRoute } from 'modules/auth/components/GuardProviderRoute';

export function Routes() {
  const { handleConnect } = useAuth();

  const cachedAuthData = useAppSelector(selectAuthData);

  useEffect(() => {
    if (cachedAuthData.authorizationToken) {
      handleConnect();
    }
  }, [handleConnect, cachedAuthData]);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect
            to={
              cachedAuthData.credentials
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
        hasCachedCredentials={Boolean(cachedAuthData.credentials)}
        render={() => (
          <DefaultLayout isPremiumPlanPage disableGutters theme={Themes.light}>
            <PlanRoutes />
          </DefaultLayout>
        )}
      />
      <GuardProviderRoute
        exact
        path={[
          PlanRoutesConfig.addEndpoint.path,
          PlanRoutesConfig.endpoint.path,
        ]}
        render={() => (
          <DefaultLayout>
            <PageNotFound />
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
        exact
        path={[
          AccountRoutesConfig.accountDetails.path,
          AccountRoutesConfig.topUp.path,
          AccountRoutesConfig.withdraw.path,
        ]}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <AccountRoutes />
          </DefaultLayout>
        )}
      />
      <Route
        exact
        path={[ExplorerRoutesConfig.requestExplorer.path]}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <RequestExplorerRoutes />
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
