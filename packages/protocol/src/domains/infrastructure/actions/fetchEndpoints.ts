import { IWorkerEndpoint } from 'multirpc-sdk';

import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { getChainIcon } from 'uiKit/utils/getTokenIcon';
import { web3Api } from 'store/queries';

export interface UserEndpoint {
  id: string;
  icon: string;
  name: string;
  requestUrl: string;
  scheme: string;
  owner: string;
  user: string;
}

export type Endpoints = Record<string, UserEndpoint[]>;

export const mapEndpoints = (endpoints: IWorkerEndpoint[]): Endpoints => {
  const data: Endpoints = {};

  const editedEndpoints = endpoints.map(item => {
    const { blockchain, requestUrl, ...other } = item;

    return {
      ...other,
      icon: getChainIcon(blockchain),
      name: blockchain,
      requestUrl,
    };
  });

  editedEndpoints.forEach(item => {
    const { name } = item;

    if (!data[name]) {
      data[name] = [item];
    } else {
      data[name].push(item);
    }
  });

  return data;
};

export const {
  useLazyInfrastructureFetchEndpointsQuery,
  endpoints: { infrastructureFetchEndpoints },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureFetchEndpoints: build.query<Endpoints, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState }) => {
        credentialsGuard(getState as GetState);

        const service = MultiService.getService();

        const endpoints = await service.getWorkerGateway().getEndpoints();

        const data = mapEndpoints(endpoints);

        return { data };
      }),
    }),
  }),
});
