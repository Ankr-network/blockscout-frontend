import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import {
  filterMapChains,
  IApiChain,
  IFetchChainsResponseData,
} from '../api/queryChains';

export interface IFetchPublicChainsResult {
  chains: IApiChain[];
  allChains: IApiChain[];
}

export const fetchPublicChains = createSmartAction<
  RequestAction<IFetchChainsResponseData, IFetchPublicChainsResult>
>('chains/fetchPublicChains', () => ({
  request: {
    promise: (async () => {
      const service = await MultiService.getPublicInstance();
      const chains = await service.getBlockchains();

      const formattedPublicChains = await service.formatPublicChains(chains);

      return {
        chains: formattedPublicChains,
        allChains: formattedPublicChains,
      };
    })(),
  },
  meta: {
    cache: true,
    getData: ({ chains, allChains }) => ({
      chains: filterMapChains(
        chains,
        ({ blockchain }) => !blockchain.premiumOnly,
      ),
      allChains: filterMapChains(allChains),
    }),
  },
}));
