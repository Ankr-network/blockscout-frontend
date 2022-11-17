import { generatePath, useParams } from 'react-router-dom';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const INDEX_PATH = '/';
export const INDEX_MM_PATH = `${INDEX_PATH}mm/`;
export const PATH_CHAIN_DETAILS = `${INDEX_PATH}:chainId/:netId?`;
export const PATH_ADD_ENDPOINT = `${INDEX_PATH}:chainId/add`;

interface ChainDetailsPageParams {
  chainId: string;
  netId?: string;
}

export const ChainsRoutesConfig = createRouteConfig(
  {
    chains: {
      path: INDEX_PATH,
      generatePath: () => INDEX_PATH,
      breadcrumbs: 'chains.breadcrumbs',
    },
    mmChains: {
      path: INDEX_MM_PATH,
      generatePath: () => INDEX_MM_PATH,
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
