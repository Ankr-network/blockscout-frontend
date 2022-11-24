import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { ChainID } from 'modules/chains/types';
import { checkWhitelistSecretChainsAndGetChainId } from '../const';
import { fetchSecuritySettings } from './fetchSecuritySettings';

export const editChainRestrictedIps = createSmartAction<
  RequestAction<string[], string[]>
>(
  'infrastructure/editChainRestrictedIps',
  (chainId: string, ips: string[]) => ({
    request: {
      promise: async () => {
        const service = MultiService.getService();

        const ipsResult = await service
          .getWorkerGateway()
          .editChainRestrictedIps(
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
