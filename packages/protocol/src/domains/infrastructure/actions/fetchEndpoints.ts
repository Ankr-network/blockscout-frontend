import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IJwtToken, IWorkerEndpoint } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { getChainIcon } from 'uiKit/utils/getTokenIcon';

export type IUserEndpoint = {
  id: string;
  icon: string;
  name: string;
  requestUrl: string;
  scheme: string;
  owner: string;
  user: string;
};

export type IEndpoint = Record<string, IUserEndpoint[]>;

export const mapEndpoints = (endpoints: IWorkerEndpoint[]): IEndpoint => {
  const data: IEndpoint = {};

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

export const fetchEndpoints = createSmartAction<
  RequestAction<IWorkerEndpoint[], IEndpoint>
>('infrastructure/fetchEndpoints', (silent = false) => ({
  request: {
    promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
      const { service } = MultiService.getInstance();

      const endpoints = await service.fetchPrivateEndpoints(jwtToken);

      return endpoints;
    },
  },
  meta: {
    asMutation: false,
    getData: mapEndpoints,
    onRequest: credentialsGuard,
    silent,
  },
}));
