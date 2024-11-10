import { Redirect, Route, Switch } from 'react-router-dom';

import { ACCOUNT_PATHS, AccountRoutes } from 'domains/account/Routes';
import {
  DashboardRoutesConfig,
  DashboardRoutes,
} from 'domains/dashboard/routes';
import {
  AdvancedApiRoutes,
  AdvancedApiRoutesConfig,
} from 'domains/advancedApi/routes';
import {
  ChainDetailsRoutes,
  ChainsRoutes,
  ChainsRoutesConfig,
} from 'domains/chains/routes';
import { ConnectWalletCard } from 'domains/userSettings/components/ConnectWalletCard';
import { GuardAuthRoute } from 'domains/auth/components/GuardAuthRoute';
import { GuardAuthUserSettingsRoute } from 'domains/userSettings/components/GuardAuthUserSettingsRoute';
import { OauthRoutes, OauthRoutesConfig } from 'domains/oauth/routes';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import { PricingRoutes, PricingRoutesConfig } from 'domains/pricing/Routes';
import {
  SETTINGS_PATHS,
  UserSettingsRoutesConfig,
} from 'domains/userSettings/Routes';
import {
  EnterpriseChainDetailsRoutes,
  EnterpriseChainsRoutes,
  EnterpriseRoutesConfig,
} from 'domains/enterprise/routes';
import { ProjectsRoutes } from 'domains/projects/routes/Routes';
import {
  PROJECT_ROUTES,
  ProjectsRoutesConfig,
} from 'domains/projects/routes/routesConfig';
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

export const Routes = () => {
  const shouldRedirectToProjects = useShouldRedirectToProjects();

  return (
    <Switch>
      <Route
        component={PricingRoutes}
        exact
        path={PricingRoutesConfig.pricing.path}
      />
      <GuardAuthRoute
        exact
        path={NotificationsRoutesConfig.notifications.path}
        component={NotificationsRoutes}
      />
      {!isReactSnap && (
        <Route component={ProjectsRoutes} exact path={PROJECT_ROUTES} />
      )}
      <GuardAuthRoute
        component={ReferralsRoutes}
        exact
        path={REFERRALS_PATHS}
      />
      {!isReactSnap && (
        <Route
          component={DashboardRoutes}
          exact
          path={DashboardRoutesConfig.dashboard.path}
        />
      )}
      {shouldRedirectToProjects && (
        <Route exact path={INDEX_PATH}>
          <Redirect to={ProjectsRoutesConfig.projects.generatePath()} />
        </Route>
      )}
      <GuardAuthRoute component={AccountRoutes} exact path={ACCOUNT_PATHS} />
      {!isReactSnap && (
        <GuardAuthUserSettingsRoute
          component={ConnectWalletCard}
          exact
          path={SETTINGS_PATHS}
        />
      )}
      <GuardTeamInvitationRoute
        exact
        path={UserSettingsRoutesConfig.teamInvitation.path}
      />
      {!isReactSnap && (
        <Route
          component={OauthRoutes}
          exact
          path={OauthRoutesConfig.oauth.path}
        />
      )}
      <Route
        component={ChainsRoutes}
        exact
        path={ChainsRoutesConfig.chains.path}
      />
      <GuardAuthRoute
        component={EnterpriseChainsRoutes}
        exact
        hasReactSnapCheck={isReactSnap}
        path={EnterpriseRoutesConfig.chains.path}
      />
      <GuardAuthRoute
        component={TeamsRoutes}
        exact
        hasReactSnapCheck={isReactSnap}
        path={TeamsRoutesConfig.newTeam.path}
      />
      <Route
        component={AdvancedApiRoutes}
        exact
        path={AdvancedApiRoutesConfig.advancedApi.path}
      />
      <GuardTelegramConfirmationRoute
        exact
        path={UserSettingsRoutesConfig.telegramConfirmation.path}
      />
      <GuardAuthRoute
        component={EnterpriseChainDetailsRoutes}
        exact
        hasReactSnapCheck={isReactSnap}
        path={EnterpriseRoutesConfig.chainDetails.path}
      />
      <Route
        exact
        path={ChainsRoutesConfig.chainDetails.path}
        component={ChainDetailsRoutes}
      />
      <Route component={PageNotFound} />
    </Switch>
  );
};
