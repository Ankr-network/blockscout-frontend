import React from 'react';
import { generatePath, Route, useParams } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { NoReactSnap } from 'uiKit/NoReactSnap';
import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const INDEX_PATH = '/';
export const PATH_CHAINS = `${INDEX_PATH}public/`;
export const PATH_CHAIN_DETAILS = `${PATH_CHAINS}:chainId/`;
export const PATH_ADD_ENDPOINT = `${PATH_CHAIN_DETAILS}add`;

export const ChainsRoutesConfig = createRouteConfig(
  {
    chains: {
      path: INDEX_PATH,
      generatePath: () => INDEX_PATH,
      breadcrumbs: 'chains.breadcrumbs',
    },
    chainDetails: {
      path: PATH_CHAIN_DETAILS,
      generatePath: (chainId: string) =>
        generatePath(PATH_CHAIN_DETAILS, { chainId }),
      useParams: () => {
        const { chainId } = useParams<{ chainId: string }>();

        return {
          chainId,
        };
      },
    },
    addEndpoint: {
      path: PATH_ADD_ENDPOINT,
      breadcrumbs: 'chains.add-endpoint.breadcrumbs',
      generatePath: (chainId: string) =>
        generatePath(PATH_ADD_ENDPOINT, { chainId }),
      useParams: () => {
        const { chainId } = useParams<{ chainId: string }>();

        return {
          chainId,
        };
      },
    },
  },
  INDEX_PATH,
);

const LoadableAddEndpointContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/AddEndpoint').then(module => module.AddEndpoint),
  {
    fallback: <Spinner />,
  },
);

const LoadableChainsContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Chains').then(module => module.Chains),
  {
    fallback: <Spinner />,
  },
);

const LoadableChainDetailsContainer: LoadableComponent<any> = loadable(
  // eslint-disable-next-line import/no-cycle
  async () => import('./screens/ChainItem').then(module => module.ChainItem),
  {
    fallback: <Spinner />,
  },
);

export function ChainsRoutes() {
  return (
    <>
      <NoReactSnap>
        <Route
          exact
          path={ChainsRoutesConfig.chains.path}
          component={LoadableChainsContainer}
        />
      </NoReactSnap>
      <Route
        exact
        path={ChainsRoutesConfig.chainDetails.path}
        component={LoadableChainDetailsContainer}
      />
    </>
  );
}

export function ChainPrivateRoutes() {
  return (
    <>
      <Route
        exact
        path={ChainsRoutesConfig.addEndpoint.path}
        component={LoadableAddEndpointContainer}
      />
    </>
  );
}
