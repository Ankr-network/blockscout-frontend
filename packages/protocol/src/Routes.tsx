import { Redirect, Route, Switch } from 'react-router-dom';

import {
  RequestExplorerRoutes,
  ExplorerRoutesConfig,
} from 'domains/explorer/Routes';
import { useAppSelector } from 'store/useAppSelector';
import { AccountRoutesConfig } from './domains/account/Routes';
import {
  ChainPrivateRoutes,
  ChainsRoutes,
  ChainsRoutesConfig,
  INDEX_PATH,
} from './domains/chains/Routes';
import {
  ProvidersRoutes,
  ProvidersRoutesConfig,
} from './domains/nodeProviders/Routes';

import { selectAuthData } from 'domains/auth/store/authSlice';
import { GuardAuthProviderRoute } from 'domains/infrastructure/components/GuardAuthProviderRoute';
import {
  UserSettingsRoutes,
  UserSettingsRoutesConfig,
} from 'domains/userSettings/Routes';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { PricingRoutes, PricingRoutesConfig } from 'domains/pricing/Routes';
import { Themes } from 'ui';
import { GuardAuthRoute } from './domains/auth/components/GuardAuthRoute';
import { useAuth } from './domains/auth/hooks/useAuth';
import { DefaultLayout } from './modules/layout/components/DefautLayout';
import { PageNotFound } from './modules/router/components/PageNotFound';

export function Routes() {
  const { handleConnect } = useAuth();

  const cachedAuthData = useAppSelector(selectAuthData);
  const { isWalletConnected } = useAuth();

  useOnMount(() => {
    if (cachedAuthData.authorizationToken) {
      handleConnect();
    }
  });

  return (
    <Switch>
      <Route
        exact
        path={['/public/']}
        render={() => (
          <DefaultLayout theme={Themes.light} withNoReactSnap={false}>
            <Redirect to={INDEX_PATH} />
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
      <Route
        exact
        path={[PricingRoutesConfig.pricing.path]}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <PricingRoutes />
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
        isAuthorized={
          Boolean(cachedAuthData.authorizationToken) && isWalletConnected
        }
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <PricingRoutes />
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
        path={[
          UserSettingsRoutesConfig.settings.path,
          UserSettingsRoutesConfig.confirmation.path,
        ]}
        render={() => (
          <DefaultLayout>
            <UserSettingsRoutes />
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
