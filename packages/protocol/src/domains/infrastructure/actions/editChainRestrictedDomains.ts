import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { ChainID } from 'modules/chains/types';
import { checkWhitelistSecretChainsAndGetChainId } from '../const';
import { fetchSecuritySettings } from './fetchSecuritySettings';

export const editChainRestrictedDomains = createSmartAction<
  RequestAction<string[], string[]>
>(
  'infrastructure/editChainRestrictedDomains',
  (chainId: string, domains: string[]) => ({
    request: {
      promise: async () => {
        const service = MultiService.getService();

        const domainsResult = await service
          .getWorkerGateway()
          .editChainRestrictedDomains(
            checkWhitelistSecretChainsAndGetChainId(chainId as ChainID),
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
