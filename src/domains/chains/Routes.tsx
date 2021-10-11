import React from 'react';
import { useParams } from 'react-router';
import { generatePath, Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_CHAINS = '/chains';
export const PATH_CHAIN_DETAILS = '/chains/:chainId';

export const ChainsRoutesConfig = createRouteConfig(
  {
    chains: {
      path: PATH_CHAINS,
      generatePath: () => PATH_CHAINS,
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
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableChainDetailsContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/ChainDetails').then(module => module.ChainDetails),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function ChainsRoutes() {
  return (
    <>
      <Route
        exact
        path={ChainsRoutesConfig.chains.path}
        component={LoadableChainsContainer}
      />
      <Route
        exact
        path={ChainsRoutesConfig.chainDetails.path}
        component={LoadableChainDetailsContainer}
      />
    </>
  );
}
