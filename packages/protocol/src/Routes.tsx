import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useAppSelector } from 'store/useAppSelector';
import {
  ChainsRoutes,
  ChainPrivateRoutes,
  ChainsRoutesConfig,
} from './domains/chains/Routes';
import {
  ProvidersRoutes,
  ProvidersRoutesConfig,
} from './domains/nodeProviders/Routes';
import { AccountRoutesConfig } from './domains/account/Routes';
import { Plan } from 'domains/account/screens/Plan';
import {
  RequestExplorerRoutes,
  ExplorerRoutesConfig,
} from 'domains/explorer/Routes';

import { DefaultLayout } from './modules/layout/components/DefautLayout';
import { PageNotFound } from './modules/router/components/PageNotFound';
import { Themes } from 'ui';
import { useAuth } from './domains/auth/hooks/useAuth';
import { GuardAuthRoute } from './domains/auth/components/GuardAuthRoute';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { GuardAuthProviderRoute } from 'domains/infrastructure/components/GuardAuthProviderRoute';

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
      <Route
        exact
        path={[ProvidersRoutesConfig.providers.path]}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <ProvidersRoutes />
          </DefaultLayout>
        )}
      />
      <GuardAuthRoute
        exact
        path={[
          AccountRoutesConfig.accountDetails.path,
          AccountRoutesConfig.topUp.path,
          AccountRoutesConfig.withdraw.path,
        ]}
        isAuthorized={Boolean(cachedAuthData.authorizationToken)}
        render={() => (
          <DefaultLayout disableGutters theme={Themes.light}>
            <Plan />
          </DefaultLayout>
        )}
      />
      <GuardAuthProviderRoute
        exact
        path={[ChainsRoutesConfig.addEndpoint.path]}
        render={() => (
          <DefaultLayout>
            <ChainPrivateRoutes />
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
