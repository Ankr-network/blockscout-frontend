import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IJwtToken } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'modules/auth/utils/credentialsGuard';
import { fetchSecuritySettings } from './fetchSecuritySettings';
import { ResponseData } from 'modules/api/utils/ResponseData';

export const editChainRestrictedDomains = createSmartAction<
  RequestAction<string[], string[]>
>(
  'nodeProviders/editChainRestrictedDomains',
  (chainId: string, domains: string[]) => ({
    request: {
      promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
        const { service } = MultiService.getInstance();

        const domainsResult = await service.editChainRestrictedDomains(
          jwtToken,
          chainId,
          domains,
        );

        if (typeof domainsResult === 'string') {
          throw new Error(domainsResult);
        }

        return domainsResult;
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
            domains: [...mutationData],
          };
        },
      },
    },
  }),
);
