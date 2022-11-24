import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { ChainID } from 'modules/chains/types';
import { checkWhitelistSecretChainsAndGetChainId } from '../const';

export const fetchRestrictedIps = createSmartAction<
  RequestAction<string[], string[]>
>('infrastructure/fetchRestrictedIps', (chainId: string) => ({
  request: {
    promise: async () => {
      const service = MultiService.getService();

      const domains = await service
        .getWorkerGateway()
        .getChainRestrictedIps(
          checkWhitelistSecretChainsAndGetChainId(chainId as ChainID),
        );

      return domains;
    },
  },
  meta: {
    onRequest: credentialsGuard,
  },
}));
