import { IJwtToken } from 'multirpc-sdk';
import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'modules/auth/utils/credentialsGuard';

export const fetchRestrictedIps = createSmartAction<
  RequestAction<string[], string[]>
>('nodeProviders/fetchRestrictedIps', (chainId: string) => ({
  request: {
    promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
      const { service } = MultiService.getInstance();

      const domains = await service.getChainRestrictedIps(jwtToken, chainId);

      return domains;
    },
  },
  meta: {
    asMutation: false,
    onRequest: credentialsGuard,
    getData: data => data,
  },
}));
