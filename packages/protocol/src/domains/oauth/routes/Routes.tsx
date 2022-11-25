import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const OAUTH_PATH = '/oauth/';

export const OauthRoutesConfig = createRouteConfig(
  {
    oauth: {
      path: OAUTH_PATH,
      generatePath: () => OAUTH_PATH,
      breadcrumbs: 'oauth.breadcrumbs',
    },
  },
  OAUTH_PATH,
);

const LoadableOauthContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Oauth').then(module => module.Oauth),
  {
    fallback: <Spinner />,
  },
);

export function OauthRoutes() {
  return (
    <Route
      exact
      path={OauthRoutesConfig.oauth.path}
      component={LoadableOauthContainer}
    />
  );
}
