import { RequestAction, RequestsStore } from '@redux-requests/core';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { MultiService } from 'modules/api/MultiService';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { ChainID } from 'modules/chains/types';
import { IJwtToken } from 'multirpc-sdk';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { checkWhitelistSecretChainsAndGetChainId } from '../const';
import { fetchSecuritySettings } from './fetchSecuritySettings';

export const editChainRestrictedIps = createSmartAction<
  RequestAction<string[], string[]>
>(
  'infrastructure/editChainRestrictedIps',
  (chainId: string, ips: string[]) => ({
    request: {
      promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
        const service = await MultiService.getInstance();

        const ipsResult = await service.editChainRestrictedIps(
          jwtToken,
          checkWhitelistSecretChainsAndGetChainId(chainId as ChainID),
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
  }),
);
