import { generatePath, useParams } from 'react-router-dom';

import { ChainDetailsPageParams } from 'domains/chains/routes';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const ENTERPRISE_ROUTE_NAME = 'enterprise/';

export const ENTERPRISE_ROOT_PATH = `/${ENTERPRISE_ROUTE_NAME}`;

const ENTERPRISE_CHAIN_DETAILS_PATH = `${ENTERPRISE_ROOT_PATH}:chainId/:netId?`;

export const EnterpriseRoutesConfig = createRouteConfig(
  {
    chains: {
      path: ENTERPRISE_ROOT_PATH,
      generatePath: () => ENTERPRISE_ROOT_PATH,
      breadcrumbs: 'enterprise.breadcrumbs',
    },
    chainDetails: {
      path: ENTERPRISE_CHAIN_DETAILS_PATH,
      generatePath: (chainId: string, netId?: string) =>
        generatePath(ENTERPRISE_CHAIN_DETAILS_PATH, { chainId, netId }),
      useParams: () => {
        const { chainId, netId } = useParams<ChainDetailsPageParams>();

        return {
          chainId,
          netId,
        };
      },
    },
  },
  ENTERPRISE_ROOT_PATH,
);
