import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IJwtToken } from '@ankr.com/multirpc';

import { MultiService } from '../../../modules/api/MultiService';
import {
  IFetchChainsResponseData,
  IApiChain,
  mapChains,
} from '../api/queryChains';

export const fetchPrivateChains = createSmartAction<
  RequestAction<IFetchChainsResponseData, IApiChain[]>
>('chains/fetchPrivateChains', (jwtToken: IJwtToken) => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      const chains = await service.createPrivateUrls(jwtToken);

      return {
        chains,
      };
    })(),
  },
  meta: {
    asMutation: false,
    getData: mapChains,
  },
}));
