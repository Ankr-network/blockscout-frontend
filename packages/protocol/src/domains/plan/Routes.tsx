import React from 'react';
import { Route, generatePath, useParams } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_PLAN = '/plan/';
export const PATH_PLAN_DEPOSIT = '/plan/deposit';
export const PATH_PROVIDERS_CHAINS = `${PATH_PLAN}chains/`;
export const PATH_PROVIDER_ENDPOINT = `${PATH_PLAN}endpoints/:chainId`;
export const PATH_ADD_ENDPOINT = `${PATH_PROVIDER_ENDPOINT}/add`;

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
    addEndpoint: {
      path: PATH_ADD_ENDPOINT,
      breadcrumbs: 'plan.add-endpoint.breadcrumbs',
      generatePath: (chainId: string) =>
        generatePath(PATH_ADD_ENDPOINT, { chainId }),
      useParams: () => {
        const { chainId } = useParams<{ chainId: string }>();

        return {
          chainId,
        };
      },
    },
    endpoint: {
      path: PATH_PROVIDER_ENDPOINT,
      generatePath: (chainId: string) =>
        generatePath(PATH_PROVIDER_ENDPOINT, { chainId }),
      useParams: () => {
        const { chainId } = useParams<{ chainId: string }>();

        return {
          chainId,
        };
      },
    },
  },

  PATH_PLAN,
);

const LoadablePlanContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Plan').then(module => module.Plan),
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

const LoadableAddEndpointContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/AddEndpoint').then(module => module.AddEndpoint),
  {
    fallback: <Spinner />,
  },
);

const LoadableEndpointContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Endpoint').then(module => module.Endpoint),
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

export function ProvidersPrivateRoutes() {
  return (
    <>
      <Route
        exact
        path={PlanRoutesConfig.addEndpoint.path}
        component={LoadableAddEndpointContainer}
      />
      <Route
        exact
        path={PlanRoutesConfig.endpoint.path}
        component={LoadableEndpointContainer}
      />
    </>
  );
}
