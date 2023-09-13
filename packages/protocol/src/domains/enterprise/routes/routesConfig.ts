import { generatePath, useParams } from 'react-router-dom';

import { ChainDetailsPageParams } from 'domains/chains/routes';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const ENTERPRISE_ROUTE_PATH = 'enterprise';

const INDEX_PATH = `/${ENTERPRISE_ROUTE_PATH}/`;
const PATH_CHAIN_DETAILS = `${INDEX_PATH}:chainId/:netId?`;

export const EnterpriseRoutesConfig = createRouteConfig(
  {
    chains: {
      path: INDEX_PATH,
      generatePath: () => INDEX_PATH,
      breadcrumbs: 'enterprise.breadcrumbs',
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
