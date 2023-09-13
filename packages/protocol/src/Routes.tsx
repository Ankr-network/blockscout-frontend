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
import { MMChainsRoutes, MMChainsRoutesConfig } from 'domains/mmChains/routes';
import { OauthRoutes, OauthRoutesConfig } from 'domains/oauth/routes';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import { PricingRoutes, PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import {
  EnterpriseChainDetailsRoutes,
  EnterpriseRoutes,
  EnterpriseRoutesConfig,
} from 'domains/enterprise/routes';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardAuthEnterpriseRoute } from 'domains/enterprise/components/GuardAuthEnterpriseRoute';
import { GuardCardPaymentSuccessAuthRoute } from 'domains/auth/components/GuardAuthRoute/GuardCardPaymentSuccessAuthRoute';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { ProjectsRoutes } from 'domains/projects/routes/Routes';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useInitialization } from 'hooks/useInitialization';

/* eslint-disable max-lines-per-function */
export const Routes = () => {
  const { hasPremium, isLoggedIn, hasPrivateAccess } = useAuth();

  useInitialization(isLoggedIn);

  return (
    <Switch>
      <Route
        exact
        path={PricingRoutesConfig.pricing.path}
        render={() => (
          <DefaultLayout hasGradient hasNoReactSnap>
            <PricingRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={[
          ProjectsRoutesConfig.projects.path,
          ProjectsRoutesConfig.newProject.path,
        ]}
        render={() => (
          <DefaultLayout hasNoReactSnap>
            <ProjectsRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={DashboardRoutesConfig.dashboard.path}
        render={() => (
          <GuardUserGroup
            shouldRedirect
            blockName={BlockWithPermission.UsageData}
          >
            <DefaultLayout hasNoReactSnap isDashboardPage>
              <DashboardRoutes />
            </DefaultLayout>
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
        hasAuthData={isLoggedIn}
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
      <GuardAuthRoute
        exact
        path={[EnterpriseRoutesConfig.chains.path]}
        render={() => (
          <GuardAuthEnterpriseRoute>
            <Route
              exact
              path={EnterpriseRoutesConfig.chains.path}
              render={() => (
                <DefaultLayout>
                  <EnterpriseRoutes />
                </DefaultLayout>
              )}
            />
          </GuardAuthEnterpriseRoute>
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
      <GuardAuthRoute
        exact
        path={[EnterpriseRoutesConfig.chainDetails.path]}
        render={() => (
          <GuardAuthEnterpriseRoute>
            <Route
              exact
              path={EnterpriseRoutesConfig.chainDetails.path}
              render={() => (
                <DefaultLayout>
                  <EnterpriseChainDetailsRoutes />
                </DefaultLayout>
              )}
            />
          </GuardAuthEnterpriseRoute>
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
