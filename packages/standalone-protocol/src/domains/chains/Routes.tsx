import { generatePath, Route, useParams } from 'react-router-dom';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { ChainId } from './api/chain';
import { ChainItem } from './screens/ChainItem';

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

export function ChainsRoutes({ chainId }: { chainId: ChainId }) {
  return (
    <>
      <Route
        exact
        path={chainId ? '/' : ChainsRoutesConfig.chainDetails.path}
        component={ChainItem}
      />
    </>
  );
}
