import { generatePath, Route, useParams } from 'react-router-dom';
import loadable from '@loadable/component';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { ChainId } from './api/chain';
import { useSpinner } from 'modules/layout/components/AppBase/AppBaseUtils';

export const PATH_CHAINS = '/chain/';
export const PATH_CHAIN_DETAILS = '/chain/:chainId/';

const { REACT_APP_CHAIN_ID } = process.env;

export const ChainsRoutesConfig = createRouteConfig(
  {
    chainDetails: {
      path: PATH_CHAIN_DETAILS,
      generatePath: (chainId: ChainId) =>
        generatePath(PATH_CHAIN_DETAILS, { chainId }),
      useParams: () => {
        const { chainId } = useParams<{ chainId: ChainId }>();

        if (REACT_APP_CHAIN_ID)
          return { chainId: REACT_APP_CHAIN_ID as ChainId };

        return {
          chainId,
        };
      },
    },
  },
  PATH_CHAINS,
);

const getComponent = (spinner: JSX.Element) =>
  loadable(
    async () => import('./screens/ChainItem').then(module => module.ChainItem),
    {
      fallback: spinner,
    },
  );

export function ChainsRoutes({ chainId }: { chainId: ChainId }) {
  const spinner = useSpinner(chainId);

  return (
    <>
      <Route
        exact
        path={chainId ? '/' : ChainsRoutesConfig.chainDetails.path}
        component={getComponent(spinner)}
      />
    </>
  );
}
