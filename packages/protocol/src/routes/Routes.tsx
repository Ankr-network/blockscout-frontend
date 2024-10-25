import { Redirect, Route, Switch } from 'react-router-dom';

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
  ChainsRoutes,
  ChainsRoutesConfig,
} from 'domains/chains/routes';
import { ConnectWalletCard } from 'domains/userSettings/components/ConnectWalletCard';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { GuardAuthRoute } from 'domains/auth/components/GuardAuthRoute';
import { GuardAuthUserSettingsRoute } from 'domains/userSettings/components/GuardAuthUserSettingsRoute';
import { OauthRoutes, OauthRoutesConfig } from 'domains/oauth/routes';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import { PricingRoutes, PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import {
  EnterpriseChainDetailsRoutes,
  EnterpriseChainsRoutes,
  EnterpriseRoutesConfig,
} from 'domains/enterprise/routes';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardAuthEnterpriseRoute } from 'domains/enterprise/components/GuardAuthEnterpriseRoute';
import { GuardCardPaymentSuccessAuthRoute } from 'domains/auth/components/GuardAuthRoute/GuardCardPaymentSuccessAuthRoute';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { ProjectsRoutes } from 'domains/projects/routes/Routes';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { GuardTeamInvitationRoute } from 'domains/userSettings/components/GuardTeamInvitationRoute';
import { TeamsRoutes, TeamsRoutesConfig } from 'domains/teams/Routes';
import {
  NotificationsRoutes,
  NotificationsRoutesConfig,
} from 'domains/notifications/Routes';
import { REFERRALS_PATHS, ReferralsRoutes } from 'domains/referrals/routes';
import { GuardTelegramConfirmationRoute } from 'domains/userSettings/components/GuardTelegramConfirmationRoute';

import { INDEX_PATH } from './constants';
import { useShouldRedirectToProjects } from './hooks/useShouldRedirectToProjects';

/* eslint-disable max-lines-per-function */
export const Routes = () => {
  const { hasPremium, hasPrivateAccess, isLoggedIn } = useAuth();

  const shouldRedirectToProjects = useShouldRedirectToProjects();

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

      <GuardAuthRoute
        exact
        path={NotificationsRoutesConfig.notifications.path}
        render={() => (
          <Route
            exact
            path={NotificationsRoutesConfig.notifications.path}
            render={() => (
              <DefaultLayout>
                <NotificationsRoutes />
              </DefaultLayout>
            )}
          />
        )}
      />

      <Route
        exact
        path={[
          ProjectsRoutesConfig.projects.path,
          ProjectsRoutesConfig.newProject.path,
          ProjectsRoutesConfig.project.path,
        ]}
        render={() => (
          <DefaultLayout hasNoReactSnap>
            <ProjectsRoutes />
          </DefaultLayout>
        )}
      />

      <GuardAuthRoute
        exact
        path={REFERRALS_PATHS}
        render={() => (
          <DefaultLayout isReferralsPage>
            <ReferralsRoutes />
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
      {shouldRedirectToProjects && (
        <Route exact path={INDEX_PATH}>
          <Redirect to={ProjectsRoutesConfig.projects.generatePath()} />
        </Route>
      )}
      <GuardAuthRoute
        exact
        path={[
          AccountRoutesConfig.accountDetails.path,
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
          <DefaultLayout hasNoReactSnap>
            <CenterContainer>
              <ConnectWalletCard />
            </CenterContainer>
          </DefaultLayout>
        )}
      />
      <GuardTeamInvitationRoute
        exact
        path={UserSettingsRoutesConfig.teamInvitation.path}
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
            <GuardUserGroup
              shouldHideAlert
              shouldRedirect
              blockName={BlockWithPermission.ChainItem}
            >
              <ChainsRoutes />
            </GuardUserGroup>
          </DefaultLayout>
        )}
      />
      <GuardAuthRoute
        hasReactSnapCheck={isReactSnap}
        exact
        path={[EnterpriseRoutesConfig.chains.path]}
        render={() => (
          <GuardAuthEnterpriseRoute>
            <Route
              exact
              path={EnterpriseRoutesConfig.chains.path}
              render={() => (
                <DefaultLayout>
                  <EnterpriseChainsRoutes />
                </DefaultLayout>
              )}
            />
          </GuardAuthEnterpriseRoute>
        )}
      />
      <GuardAuthRoute
        hasReactSnapCheck={isReactSnap}
        exact
        path={[TeamsRoutesConfig.newTeam.path]}
        render={() => (
          <Route
            exact
            path={TeamsRoutesConfig.newTeam.path}
            render={() => (
              <DefaultLayout>
                <TeamsRoutes />
              </DefaultLayout>
            )}
          />
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

      {/* <GuardAuthRoute
        exact
        path={[UserSettingsRoutesConfig.telegramConfirmation.path]}
      > */}
      <GuardTelegramConfirmationRoute
        exact
        path={UserSettingsRoutesConfig.telegramConfirmation.path}
      />
      {/* </GuardAuthRoute> */}

      <GuardAuthRoute
        hasReactSnapCheck={isReactSnap}
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
      <Route
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
