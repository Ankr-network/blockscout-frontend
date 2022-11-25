import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { ChainID } from 'modules/chains/types';
import { checkWhitelistSecretChainsAndGetChainId } from '../const';

export const fetchRestrictedDomains = createSmartAction<
  RequestAction<string[], string[]>
>('infrastructure/fetchRestrictedDomains', (chainId: string) => ({
  request: {
    promise: async () => {
      const service = MultiService.getService();

      const domains = await service
        .getWorkerGateway()
        .getChainRestrictedDomains(
          checkWhitelistSecretChainsAndGetChainId(chainId as ChainID),
        );

      return domains;
    },
  },
  meta: {
    asMutation: false,
    onRequest: credentialsGuard,
    getData: data => data,
  },
}));
