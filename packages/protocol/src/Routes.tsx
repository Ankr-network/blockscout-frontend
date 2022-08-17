import { GuardPricingRoute } from 'domains/auth/components/GuardAuthRoute/GuardPricingRoute';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { GuardAuthProviderRoute } from 'domains/infrastructure/components/GuardAuthProviderRoute';
import { PricingRoutes, PricingRoutesConfig } from 'domains/pricing/Routes';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { ConnectWalletCard } from 'domains/userSettings/components/ConnectWalletCard';
import { GuardAuthUserSettingsRoute } from 'domains/userSettings/components/GuardAuthUserSettingsRoute';
import {
  UserSettingsRoutes,
  UserSettingsRoutesConfig,
} from 'domains/userSettings/Routes';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAppSelector } from 'store/useAppSelector';
import { Themes } from 'ui';
import { AccountRoutes, AccountRoutesConfig } from './domains/account/Routes';
import { GuardAuthRoute } from './domains/auth/components/GuardAuthRoute';
import { useAuth } from './domains/auth/hooks/useAuth';
import {
  ChainPrivateRoutes,
  ChainsRoutes,
  ChainsRoutesConfig,
} from './domains/chains/routes';
import { DefaultLayout } from './modules/layout/components/DefautLayout';
import { PageNotFound } from './modules/router/components/PageNotFound';

export const Routes = () => {
  const { handleConnect, credentials } = useAuth();

  const cachedAuthData = useAppSelector(selectAuthData);
  const hasCredentials = useMemo(() => Boolean(credentials), [credentials]);

  useOnMount(() => {
    if (cachedAuthData.authorizationToken) {
      handleConnect(true);
    }
  });

  return (
    <Switch>
      <GuardPricingRoute
        exact
        path={[PricingRoutesConfig.pricing.path]}
        hasCredentials={hasCredentials}
        isManualConnected={Boolean(cachedAuthData.isManualConnected)}
        render={() => (
          <DefaultLayout theme={Themes.light} hasNoReactSnap disableGutters>
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
        hasAuthData={Boolean(cachedAuthData.authorizationToken)}
        isManualDisconnected={Boolean(cachedAuthData.isManualDisconnected)}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <AccountRoutes />
          </DefaultLayout>
        )}
      />
      <GuardAuthUserSettingsRoute
        exact
        path={[
          UserSettingsRoutesConfig.settings.path,
          UserSettingsRoutesConfig.confirmation.path,
        ]}
        render={() => (
          <DefaultLayout disableGutters theme={Themes.light}>
            <CenterContainer>
              <ConnectWalletCard />
            </CenterContainer>
          </DefaultLayout>
        )}
        hasAuthData={Boolean(cachedAuthData.authorizationToken)}
        authorizedRender={
          <DefaultLayout>
            <UserSettingsRoutes />
          </DefaultLayout>
        }
      />
      {/* We should keep routes with dynamic `:chainId` after static routes */}
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
        render={() => (
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        )}
      />
    </Switch>
  );
};
