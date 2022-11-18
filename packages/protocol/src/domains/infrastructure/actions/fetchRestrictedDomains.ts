import { RequestAction, RequestsStore } from '@redux-requests/core';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { MultiService } from 'modules/api/MultiService';
import { ChainID } from 'modules/chains/types';
import { IJwtToken } from 'multirpc-sdk';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { checkWhitelistSecretChainsAndGetChainId } from '../const';

export const fetchRestrictedDomains = createSmartAction<
  RequestAction<string[], string[]>
>('infrastructure/fetchRestrictedDomains', (chainId: string) => ({
  request: {
    promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
      const service = await MultiService.getInstance();

      const domains = await service.getChainRestrictedDomains(
        jwtToken,
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
