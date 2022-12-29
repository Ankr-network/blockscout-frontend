import { Route, Switch } from 'react-router-dom';

import { GuardCardPaymentSuccessAuthRoute } from 'domains/auth/components/GuardAuthRoute/GuardCardPaymentSuccessAuthRoute';
import { GuardPricingRoute } from 'domains/auth/components/GuardAuthRoute/GuardPricingRoute';
import { GuardAuthProviderRoute } from 'domains/infrastructure/components/GuardAuthProviderRoute';
import { MMChainsRoutes, MMChainsRoutesConfig } from 'domains/mmChains/routes';
import { PricingRoutes, PricingRoutesConfig } from 'domains/pricing/Routes';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { ConnectWalletCard } from 'domains/userSettings/components/ConnectWalletCard';
import { GuardAuthUserSettingsRoute } from 'domains/userSettings/components/GuardAuthUserSettingsRoute';
import {
  UserSettingsRoutes,
  UserSettingsRoutesConfig,
} from 'domains/userSettings/Routes';
import { Themes } from 'ui';
import { AccountRoutes, AccountRoutesConfig } from './domains/account/Routes';
import { GuardAuthRoute } from './domains/auth/components/GuardAuthRoute';
import { useAuth } from './domains/auth/hooks/useAuth';
import {
  ChainDetailsRoutes,
  ChainPrivateRoutes,
  ChainsRoutes,
  ChainsRoutesConfig,
} from './domains/chains/routes';
import { DefaultLayout } from './modules/layout/components/DefautLayout';
import { PageNotFound } from './modules/router/components/PageNotFound';
import { OauthRoutes, OauthRoutesConfig } from 'domains/oauth/routes';
import { useAutoconnect } from './useAutoconnect';
import { GuardPremiumRoute } from 'domains/auth/components/GuardAuthRoute/GuardPremiumRoute';

export const Routes = () => {
  const { hasPrivateAccess, hasPremium, ...authData } = useAuth();

  const hasAuthData = Boolean(authData.authorizationToken);

  useAutoconnect();

  return (
    <Switch>
      <GuardPricingRoute
        exact
        path={[PricingRoutesConfig.pricing.path]}
        hasPremium={hasPremium}
        render={() => (
          <DefaultLayout
            theme={Themes.light}
            hasNoReactSnap
            disableGutters
            hasMaxWidth={false}
            isHeaderTransparent
          >
            <PricingRoutes />
          </DefaultLayout>
        )}
      />
      <GuardAuthRoute
        exact
        path={[
          AccountRoutesConfig.topUp.path,
          AccountRoutesConfig.cardPaymentFailure.path,
        ]}
        hasAuthData={hasAuthData}
        hasPremium={hasPremium}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <AccountRoutes />
          </DefaultLayout>
        )}
      />
      <GuardPremiumRoute
        exact
        path={[AccountRoutesConfig.accountDetails.path]}
        hasAuthData={hasAuthData}
        hasPremium={hasPremium}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <AccountRoutes />
          </DefaultLayout>
        )}
      />
      <GuardCardPaymentSuccessAuthRoute
        exact
        path={[AccountRoutesConfig.cardPaymentSuccess.path]}
        hasAuthData={hasAuthData}
        hasPremium={hasPremium}
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
          <DefaultLayout theme={Themes.light}>
            <CenterContainer>
              <ConnectWalletCard />
            </CenterContainer>
          </DefaultLayout>
        )}
        hasAuthData={hasAuthData}
        authorizedRender={
          <DefaultLayout>
            <UserSettingsRoutes />
          </DefaultLayout>
        }
      />
      <Route
        exact
        path={OauthRoutesConfig.oauth.path}
        render={() => (
          <DefaultLayout hasNoReactSnap>
            <OauthRoutes />
          </DefaultLayout>
        )}
      />
      <Route
        exact
        path={ChainsRoutesConfig.chains.path}
        render={() => (
          <DefaultLayout>
            <ChainsRoutes />
          </DefaultLayout>
        )}
      />
      <Route
        exact
        path={[MMChainsRoutesConfig.mmChains.path]}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <MMChainsRoutes />
          </DefaultLayout>
        )}
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
        path={[ChainsRoutesConfig.chainDetails.path]}
        render={() => (
          <DefaultLayout theme={Themes.light}>
            <ChainDetailsRoutes />
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
