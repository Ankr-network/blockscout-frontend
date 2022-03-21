import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWorkerEndpoint } from 'multirpc-sdk';

import { credentialsGuard } from 'modules/auth/utils/credentialsGuard';
import { fetchRestrictedDomains } from './fetchRestrictedDomains';
import { fetchRestrictedIps } from './fetchRestrictedIps';

export type ISecuritySettings = {
  domains: string[];
  ips: string[];
};

export const fetchSecuritySettings = createSmartAction<
  RequestAction<IWorkerEndpoint[], ISecuritySettings>
>('nodeProviders/fetchSecuritySettings', (chainId: string) => ({
  request: {
    promise: async (store: RequestsStore) => {
      const [{ data: domains }, { data: ips }] = await Promise.all([
        store.dispatchRequest(fetchRestrictedDomains(chainId)),
        store.dispatchRequest(fetchRestrictedIps(chainId)),
      ]);

      return {
        domains,
        ips,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: credentialsGuard,
  },
}));
