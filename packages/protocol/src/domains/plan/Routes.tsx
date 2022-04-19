import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_PLAN = '/plan/';
export const PATH_PLAN_DEPOSIT = '/plan/deposit';
export const PATH_PROVIDERS_CHAINS = `${PATH_PLAN}chains/`;
export const PATH_PROVIDER_ENDPOINT = `${PATH_PLAN}endpoints/:chainId`;

export const PlanRoutesConfig = createRouteConfig(
  {
    plan: {
      path: PATH_PLAN,
      generatePath: () => PATH_PLAN,
      breadcrumbs: 'plan.breadcrumbs',
    },
    planDeposit: {
      path: PATH_PLAN_DEPOSIT,
      generatePath: () => PATH_PLAN_DEPOSIT,
      breadcrumbs: 'plan.deposit.breadcrumbs',
    },
    chains: {
      path: PATH_PROVIDERS_CHAINS,
      generatePath: () => PATH_PROVIDERS_CHAINS,
      breadcrumbs: 'providers.chains.breadcrumbs',
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

const LoadablePlanDepositContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Plan/Deposit').then(module => module.Deposit),
  {
    fallback: <Spinner />,
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
      <Route
        exact
        path={PlanRoutesConfig.planDeposit.path}
        component={LoadablePlanDepositContainer}
      />
    </>
  );
}
