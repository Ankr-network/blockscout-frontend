import loadable, { LoadableComponent } from '@loadable/component';
import { Route } from 'react-router-dom';
import { OverlaySpinner } from '@ankr.com/ui';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { useRedirectForSmallDevices } from 'hooks/useRedirectForSmallDevices';

export const PATH_TEAMS = '/teams/';
export const PATH_NEW_TEAM = `${PATH_TEAMS}new/`;

export const TeamsRoutesConfig = createRouteConfig(
  {
    newTeam: {
      path: PATH_NEW_TEAM,
      generatePath: () => PATH_NEW_TEAM,
      breadcrumbs: 'teams.new.breadcrumbs',
    },
  },
  PATH_TEAMS,
);

const LoadableCreateTeamContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/NewTeamPage').then(module => module.NewTeamPage),
  {
    fallback: <OverlaySpinner />,
  },
);

export function TeamsRoutes() {
  useRedirectForSmallDevices();

  return (
    <>
      <Route
        exact
        path={TeamsRoutesConfig.newTeam.path}
        component={LoadableCreateTeamContainer}
      />
    </>
  );
}
