import { Web3Address } from 'multirpc-sdk';
import { generatePath, Route, useParams } from 'react-router';

import { createRouteConfig } from '@ankr.com/utils';
import { ClientsPage } from './components/ClientsPage';

const PATH_CLIENTS = '/clients';
const PATH_CLIENT_INFO = `${PATH_CLIENTS}/:address`;

interface IClientInfoParams {
  address: Web3Address;
}

export const ClientsRoutesConfig = createRouteConfig(
  {
    clients: {
      path: PATH_CLIENTS,
      generatePath: () => PATH_CLIENTS,
    },
    clientInfo: {
      path: PATH_CLIENT_INFO,
      generatePath: (address: Web3Address) =>
        generatePath(PATH_CLIENT_INFO, { address }),
      useParams: () => {
        const { address } = useParams<IClientInfoParams>();

        return {
          address,
        };
      },
    },
  },

  PATH_CLIENTS,
);

export function ClientsRoutes() {
  return (
    <>
      <Route
        exact
        path={ClientsRoutesConfig.clients.path}
        component={ClientsPage}
      />
    </>
  );
}
