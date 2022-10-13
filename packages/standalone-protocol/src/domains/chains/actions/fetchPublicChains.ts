import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import {
  IFetchChainsResponseData,
  IApiChain,
  mapChains,
} from '../api/queryChains';

export const fetchPublicChains = createSmartAction<
  RequestAction<IFetchChainsResponseData, IApiChain[]>
>('chains/fetchPublicChains', () => ({
  request: {
    promise: (async () => {
      const service = await MultiService.getPublicInstance();
      const blockchains = await service.getBlockchains();

      const chains = await service.formatPublicChains(blockchains);

      return {
        chains,
      };
    })(),
  },
  meta: {
    cache: true,
    asMutation: false,
    getData: mapChains,
  },
}));
