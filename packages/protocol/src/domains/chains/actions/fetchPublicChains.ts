import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import {
  filterMapChains,
  IApiChain,
  IFetchChainsResponseData,
} from '../api/queryChains';

export const fetchPublicChains = createSmartAction<
  RequestAction<IFetchChainsResponseData, IApiChain[]>
>('chains/fetchPublicChains', () => ({
  request: {
    promise: (async () => {
      const chains = await MultiService.getPublicInstance().getPublicUrls();

      return {
        chains,
      };
    })(),
  },
  meta: {
    cache: true,
    getData: data =>
      filterMapChains(data, ({ blockchain }) => !blockchain.premiumOnly), // TODO: rm test
  },
}));
