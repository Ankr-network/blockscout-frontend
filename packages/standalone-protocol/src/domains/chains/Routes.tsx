import React from 'react';
import { generatePath, Route, useParams } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'uiKit/Spinner';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_CHAINS = '/chain/';
export const PATH_CHAIN_DETAILS = '/chain/:chainId/';

const { REACT_APP_CHAIN_ID } = process.env;

export const ChainsRoutesConfig = createRouteConfig(
  {
    chainDetails: {
      path: PATH_CHAIN_DETAILS,
      generatePath: (chainId: string) =>
        generatePath(PATH_CHAIN_DETAILS, { chainId }),
      useParams: () => {
        const { chainId } = useParams<{ chainId: string }>();

        if (REACT_APP_CHAIN_ID) return { chainId: REACT_APP_CHAIN_ID };

        return {
          chainId,
        };
      },
    },
  },
  PATH_CHAINS,
);

const LoadableChainDetailsContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/ChainItem').then(module => module.ChainItem),
  {
    fallback: <Spinner />,
  },
);

export function ChainsRoutes({ chainId }: { chainId?: string }) {
  return (
    <>
      <Route
        exact
        path={chainId ? '/' : ChainsRoutesConfig.chainDetails.path}
        component={LoadableChainDetailsContainer}
      />
    </>
  );
}
