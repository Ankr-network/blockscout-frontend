import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_PLAN = '/plan/';

export const PlanRoutesConfig = createRouteConfig(
  {
    plan: {
      path: PATH_PLAN,
      generatePath: () => PATH_PLAN,
      breadcrumbs: 'plan.breadcrumbs',
    },
    planDeposit: {
      path: PATH_PLAN,
      generatePath: () => PATH_PLAN,
      breadcrumbs: 'plan.deposit.breadcrumbs',
    },
  },
  PATH_PLAN,
);

const LoadablePlanContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Plan/Plan').then(module => module.Plan),
  {
    fallback: <Spinner />,
  },
);

export function PlanRoutes() {
  return (
    <Route
      exact
      path={PlanRoutesConfig.plan.path}
      component={LoadablePlanContainer}
    />
  );
}
