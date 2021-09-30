import React from 'react';
import { useParams } from 'react-router';
import { generatePath, Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from 'modules/common/types/RouteConfiguration';

const PATH_CHAINS = '/';
const PATH_CHAIN_DETAILS = '/chain/:chainId';

interface ChainsRoutesConfigType {
  Chains: RouteConfiguration;
  ChainDetails: RouteConfiguration;
}

export const ChainsRoutesConfig: ChainsRoutesConfigType = {
  Chains: {
    path: PATH_CHAINS,
    generatePath: () => PATH_CHAINS,
  },

  ChainDetails: {
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
};

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
        path={ChainsRoutesConfig.Chains.path}
        component={LoadableChainsContainer}
      />

      <Route
        exact
        path={ChainsRoutesConfig.ChainDetails.path}
        component={LoadableChainDetailsContainer}
      />
    </>
  );
}
