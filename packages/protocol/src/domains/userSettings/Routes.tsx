import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route } from 'react-router-dom';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';

import {
  ESettingsContentType,
  SETTINGS_QUERY_KEY,
  SettingsRouteQueryParams,
  TeamInvitationQueryParams,
} from './types';

export const PATH_SETTINGS = '/settings/';
export const PATH_CONFIRMATION = `${PATH_SETTINGS}confirmation/`;
export const PATH_TEAM_INVITATION = `${PATH_SETTINGS}invitation/`;

export const UserSettingsRoutesConfig = createRouteConfig(
  {
    confirmation: {
      path: PATH_CONFIRMATION,
      generatePath: () => PATH_CONFIRMATION,
      breadcrumbs: 'user-settings.confirmation-screen.breadcrumbs',
    },
    settings: {
      path: PATH_SETTINGS,
      generatePath: (params?: ESettingsContentType) => {
        return params
          ? `${PATH_SETTINGS}?${SETTINGS_QUERY_KEY}=${params}`
          : PATH_SETTINGS;
      },
      useQuery: () => {
        const search = useQueryParams();
        const entries = search.entries();

        return Object.fromEntries(entries) as SettingsRouteQueryParams;
      },
      breadcrumbs: 'user-settings.settings-screen.breadcrumbs',
    },
    teamInvitation: {
      path: PATH_TEAM_INVITATION,
      generatePath: (params: TeamInvitationQueryParams) =>
        `${PATH_TEAM_INVITATION}?${new URLSearchParams({
          ...params,
        }).toString()}`,
      useQuery: () => {
        const search = useQueryParams();
        const entries = search.entries();

        return Object.fromEntries(
          entries,
        ) as unknown as TeamInvitationQueryParams;
      },
    },
  },
  PATH_SETTINGS,
);

const LoadableConfirmationContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/Confirmation').then(module => module.Confirmation),
  {
    fallback: <OverlaySpinner />,
  },
);

const LoadableSettingsContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Settings').then(module => module.Settings),
  {
    fallback: <OverlaySpinner />,
  },
);

const LoadableTeamInvitationContainer = loadable(
  async () =>
    import('./screens/TeamInvitation').then(module => module.TeamInvitation),
  {
    fallback: <OverlaySpinner />,
  },
);

export function UserSettingsRoutes() {
  return (
    <>
      <Route
        exact
        path={UserSettingsRoutesConfig.confirmation.path}
        component={LoadableConfirmationContainer}
      />
      <Route
        exact
        path={UserSettingsRoutesConfig.settings.path}
        component={LoadableSettingsContainer}
      />
      <Route
        exact
        path={UserSettingsRoutesConfig.teamInvitation.path}
        component={LoadableTeamInvitationContainer}
      />
    </>
  );
}
