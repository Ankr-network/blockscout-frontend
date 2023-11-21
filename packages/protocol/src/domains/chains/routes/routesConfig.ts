import { generatePath, useParams } from 'react-router-dom';
import { INDEX_PATH } from 'routes/constants';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const CHAIN_DETAILS_SUBPATH = ':chainId/:netId?';
export const ADD_ENDPOINT_SUBPATH = ':chainId/add';

export const CHAINS_PATH = '/chains/';
export const PATH_CHAIN_DETAILS = `${CHAINS_PATH}${CHAIN_DETAILS_SUBPATH}`;
export const PATH_ADD_ENDPOINT = `${CHAINS_PATH}${ADD_ENDPOINT_SUBPATH}`;

export const PATH_CHAIN_DETAILS_DIRECT = `${INDEX_PATH}${CHAIN_DETAILS_SUBPATH}`;
export const PATH_ADD_ENDPOINT_DIRECT = `${INDEX_PATH}${ADD_ENDPOINT_SUBPATH}`;

export interface ChainDetailsPageParams {
  chainId: string;
  netId?: string;
}

export const ChainsRoutesConfig = createRouteConfig(
  {
    chains: {
      path: CHAINS_PATH,
      generatePath: () => CHAINS_PATH,
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
    chainDetailsDirect: {
      path: PATH_CHAIN_DETAILS_DIRECT,
      generatePath: (chainId: string, netId?: string) =>
        generatePath(PATH_CHAIN_DETAILS_DIRECT, { chainId, netId }),
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
    addEndpointDirect: {
      path: PATH_ADD_ENDPOINT_DIRECT,
      generatePath: (chainId: string) =>
        generatePath(PATH_ADD_ENDPOINT_DIRECT, { chainId }),
    },
  },
  INDEX_PATH,
);
