import { generatePath, useParams } from 'react-router-dom';
import { INDEX_ENDPOINTS_PATH, INDEX_PATH } from 'routes/constants';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

const CHAIN_DETAILS_SUBPATH = ':chainId/:netId?';
const ADD_ENDPOINT_SUBPATH = ':chainId/add';

export const CHAINS_PATH = INDEX_PATH;
export const PATH_CHAIN_DETAILS = `${CHAINS_PATH}${CHAIN_DETAILS_SUBPATH}`;
export const PATH_ADD_ENDPOINT = `${CHAINS_PATH}${ADD_ENDPOINT_SUBPATH}`;

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
