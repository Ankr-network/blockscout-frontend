import React from 'react';
import { generatePath, Route, useParams } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { NoReactSnap } from 'uiKit/NoReactSnap';
import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_CHAINS = '/public/';
export const PATH_CHAIN_DETAILS = '/public/:chainId/';

export const ChainsRoutesConfig = createRouteConfig(
  {
    chains: {
      path: PATH_CHAINS,
      generatePath: () => PATH_CHAINS,
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
  },
  PATH_CHAINS,
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
