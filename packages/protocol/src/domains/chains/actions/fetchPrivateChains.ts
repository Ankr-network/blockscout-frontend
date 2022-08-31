import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IJwtToken } from 'multirpc-sdk';
import { MultiService } from '../../../modules/api/MultiService';
import { credentialsGuard } from '../../auth/utils/credentialsGuard';
import {
  filterMapChains,
  IApiChain,
  IFetchChainsResponseData,
} from '../api/queryChains';

export const fetchPrivateChains = createSmartAction<
  RequestAction<IFetchChainsResponseData, IApiChain[]>
>('chains/fetchPrivateChains', () => ({
  request: {
    promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
      const service = await MultiService.getInstance();

      const chains = await service.fetchPrivateUrls(jwtToken);

      return {
        chains,
      };
    },
  },
  meta: {
    asMutation: false,
    getData: data => filterMapChains(data),
    onRequest: credentialsGuard,
  },
}));
