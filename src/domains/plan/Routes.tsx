import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_PLAN = '/plan';

export const PlanRoutesConfig = createRouteConfig(
  {
    plan: {
      path: PATH_PLAN,
      generatePath: () => PATH_PLAN,
    },
  },
  PATH_PLAN,
);

const LoadablePlanContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Plan').then(module => module.Plan),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function PlanRoutes() {
  return (
    <>
      <Route
        exact
        path={PlanRoutesConfig.plan.path}
        component={LoadablePlanContainer}
      />
    </>
  );
}
