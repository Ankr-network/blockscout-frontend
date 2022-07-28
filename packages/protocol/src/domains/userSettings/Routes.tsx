import loadable, { LoadableComponent } from '@loadable/component';
import { Route } from 'react-router-dom';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { Spinner } from 'ui';

export const PATH_SETTINGS = '/settings/';
export const PATH_CONFIRMATION = `${PATH_SETTINGS}confirmation/`;

export const UserSettingsRoutesConfig = createRouteConfig(
  {
    confirmation: {
      path: PATH_CONFIRMATION,
      generatePath: () => PATH_CONFIRMATION,
      breadcrumbs: 'user-settings.confirmation-screen.breadcrumbs',
    },
    settings: {
      path: PATH_SETTINGS,
      generatePath: () => PATH_SETTINGS,
      breadcrumbs: 'user-settings.settings-screen.breadcrumbs',
    },
  },
  PATH_SETTINGS,
);
const LoadableConfirmationContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/Confirmation').then(module => module.Confirmation),
  {
    fallback: <Spinner />,
  },
);

const LoadableSettingsContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Settings').then(module => module.Settings),
  {
    fallback: <Spinner />,
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
    </>
  );
}
