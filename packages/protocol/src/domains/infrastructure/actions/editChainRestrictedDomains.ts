import { RequestAction, RequestsStore } from '@redux-requests/core';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { MultiService } from 'modules/api/MultiService';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { ChainID } from 'modules/chains/types';
import { IJwtToken } from 'multirpc-sdk';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { checkWhitelistSecretChainsAndGetChainId } from '../const';
import { fetchSecuritySettings } from './fetchSecuritySettings';

export const editChainRestrictedDomains = createSmartAction<
  RequestAction<string[], string[]>
>(
  'infrastructure/editChainRestrictedDomains',
  (chainId: string, domains: string[]) => ({
    request: {
      promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
        const service = await MultiService.getInstance();

        const domainsResult = await service.editChainRestrictedDomains(
          jwtToken,
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
