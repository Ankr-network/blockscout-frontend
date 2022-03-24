import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IJwtToken } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'modules/auth/utils/credentialsGuard';
import { fetchSecuritySettings } from './fetchSecuritySettings';
import { ResponseData } from 'modules/api/utils/ResponseData';

export const editChainRestrictedIps = createSmartAction<
  RequestAction<string[], string[]>
>('nodeProviders/editChainRestrictedIps', (chainId: string, ips: string[]) => ({
  request: {
    promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
      const { service } = MultiService.getInstance();

      const ipsResult = await service.editChainRestrictedIps(
        jwtToken,
        chainId,
        ips,
      );

      if (typeof ipsResult === 'string') {
        throw new Error(ipsResult);
      }

      return ipsResult;
    },
  },
  meta: {
    asMutation: true,
    onRequest: credentialsGuard,
    showNotificationOnError: true,
    mutations: {
      [fetchSecuritySettings.toString()]: (
        data: ResponseData<typeof fetchSecuritySettings>,
        mutationData: string[],
      ): ResponseData<typeof fetchSecuritySettings> => {
        return {
          ...data,
          ips: [...mutationData],
        };
      },
    },
  },
}));
