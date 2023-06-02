import { Route, Switch } from 'react-router-dom';

import { AccountRoutes, AccountRoutesConfig } from 'domains/account/Routes';
import {
  DashboardRoutesConfig,
  DashboardRoutes,
} from 'domains/dashboard/routes';
import {
  AdvancedApiRoutes,
  AdvancedApiRoutesConfig,
} from 'domains/advancedApi/routes';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import {
  ChainDetailsRoutes,
  ChainPrivateRoutes,
  ChainsRoutes,
  ChainsRoutesConfig,
} from 'domains/chains/routes';
import { ConnectWalletCard } from 'domains/userSettings/components/ConnectWalletCard';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { GuardAuthProviderRoute } from 'domains/infrastructure/components/GuardAuthProviderRoute';
import {
  GuardAuthRoute,
  GuardPremiumEndpointRoute,
} from 'domains/auth/components/GuardAuthRoute';
import { GuardAuthUserSettingsRoute } from 'domains/userSettings/components/GuardAuthUserSettingsRoute';
import { GuardCardPaymentSuccessAuthRoute } from 'domains/auth/components/GuardAuthRoute/GuardCardPaymentSuccessAuthRoute';
import { MMChainsRoutes, MMChainsRoutesConfig } from 'domains/mmChains/routes';
import { OauthRoutes, OauthRoutesConfig } from 'domains/oauth/routes';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import { PricingRoutes, PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useAutoconnect } from 'hooks/useAutoconnect';
import { useWeb3ThemeSwitcher } from 'hooks/useWeb3ThemeSwitcher';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardPremiumRoute } from 'domains/userGroup/components/GuardPremiumRoute';
import { useTransitionToFreeWatcher } from 'domains/auth/hooks/useTransitionToFreeWatcher';
import { useBalanceSubscription } from 'hooks/useBalanceSubscription';
import { usePremiumStatusSubscription } from 'domains/auth/hooks/usePremiumStatusSubscription';
import { useCheckChangedSignupUserSettingsAndUpdate } from 'hooks/useCheckChangedSignupUserSettingsAndUpdate';

export const Routes = () => {
  const { hasPremium, hasPrivateAccess, isUserEthAddressType, isLoggedIn } =
    useAuth();

  const hasAuthData = Boolean(isLoggedIn);

  usePremiumStatusSubscription();
  useBalanceSubscription();
  useAutoconnect();
  useWeb3ThemeSwitcher();
  useCheckChangedSignupUserSettingsAndUpdate();
  useTransitionToFreeWatcher();

  return (
    <Switch>
      <Route
        exact
        path={PricingRoutesConfig.pricing.path}
        render={() => (
          <DefaultLayout hasGradient hasNoReactSnap hasPaddingBottom={false}>
            <PricingRoutes />
          </DefaultLayout>
        )}
      />

      <GuardAuthRoute
        exact
        path={DashboardRoutesConfig.dashboard.path}
        hasAuthData={hasAuthData}
        hasPremium={hasPremium}
        render={() => (
          <GuardUserGroup
            shouldRedirect
            blockName={BlockWithPermission.UsageData}
          >
            <GuardPremiumRoute hasPremium={hasPremium}>
              <DefaultLayout hasNoReactSnap>
                <DashboardRoutes />
              </DefaultLayout>
            </GuardPremiumRoute>
          </GuardUserGroup>
        )}
      />

      <GuardAuthRoute
        exact
        path={[
          AccountRoutesConfig.accountDetails.path,
          AccountRoutesConfig.topUp.path,
          AccountRoutesConfig.cardPaymentFailure.path,
        ]}
        hasAuthData={hasAuthData}
        hasPremium={hasPremium}
        render={() => (
          <GuardUserGroup
            shouldRedirect
            blockName={BlockWithPermission.Billing}
          >
            <DefaultLayout>
              <AccountRoutes />
            </DefaultLayout>
          </GuardUserGroup>
        )}
      />
      <GuardCardPaymentSuccessAuthRoute
        exact
        path={AccountRoutesConfig.cardPaymentSuccess.path}
        isUserEthAddressType={isUserEthAddressType}
        hasAuthData={hasAuthData}
        hasPremium={hasPremium}
        hasPrivateAccess={hasPrivateAccess}
        render={() => (
          <DefaultLayout>
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
        hasAuthData={hasAuthData}
        render={() => (
          <DefaultLayout>
            <CenterContainer>
              <ConnectWalletCard />
            </CenterContainer>
          </DefaultLayout>
        )}
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
          <GuardUserGroup
            shouldRedirect
            blockName={BlockWithPermission.UsageData}
          >
            <DefaultLayout>
              <MMChainsRoutes />
            </DefaultLayout>
          </GuardUserGroup>
        )}
      />

      <Route
        exact
        path={AdvancedApiRoutesConfig.advancedApi.path}
        render={() => (
          <GuardUserGroup
            shouldRedirect
            blockName={BlockWithPermission.ChainItem}
          >
            <DefaultLayout>
              <AdvancedApiRoutes />
            </DefaultLayout>
          </GuardUserGroup>
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

      <GuardPremiumEndpointRoute
        exact
        path={[ChainsRoutesConfig.chainDetails.path]}
        render={() => (
          <GuardUserGroup
            shouldRedirect
            blockName={BlockWithPermission.ChainItem}
          >
            <DefaultLayout isChainItemPage>
              <ChainDetailsRoutes />
            </DefaultLayout>
          </GuardUserGroup>
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
