import { generatePath, useParams } from 'react-router-dom';
import { INDEX_ENDPOINTS_PATH, INDEX_PATH } from 'routes/constants';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

const CHAIN_SUBPATH = ':chainId';
const CHAIN_DETAILS_SUBPATH = `${CHAIN_SUBPATH}/:netId?`;

const CHAINS_PATH = INDEX_PATH;
const PATH_CHAIN_DETAILS = `${CHAINS_PATH}${CHAIN_DETAILS_SUBPATH}/`;

export interface ChainDetailsPageParams {
  chainId: string;
  netId?: string;
}

export interface GenerateChainsPathParams {
  isLoggedIn: boolean;
}

export const ChainsRoutesConfig = createRouteConfig(
  {
    chains: {
      path: CHAINS_PATH,
      generatePath: ({ isLoggedIn }: GenerateChainsPathParams) =>
        isLoggedIn ? INDEX_ENDPOINTS_PATH : CHAINS_PATH,
      breadcrumbs: 'chains.breadcrumbs',
    },
    chainDetails: {
      path: PATH_CHAIN_DETAILS,
      generatePath: (chainId: string, netId?: string) =>
        generatePath(PATH_CHAIN_DETAILS, { chainId, netId }),
      useParams: () => {
        const { chainId, netId } = useParams<ChainDetailsPageParams>();

        return {
          chainId,
          netId,
        };
      },
    },
  },
  INDEX_PATH,
);
