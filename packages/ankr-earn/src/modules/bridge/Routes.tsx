import loadable from '@loadable/component';
import { EARN_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import React from 'react';
import { generatePath } from 'react-router';
import { Route } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

const ROOT = `${EARN_PATH}bridge/`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },
  },
  ROOT,
);

const BridgeMainPage = loadable(
  async () =>
    import('./screens/BridgeMainPage').then(module => module.BridgeMainPage),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function getRoutes() {
  return (
    <Route path={RoutesConfig.main.path} exact>
      <DefaultLayout>
        <BridgeMainPage />
      </DefaultLayout>
    </Route>
  );
}
