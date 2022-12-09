import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import {
  IApiChain,
  IFetchChainsResponseData,
  filterMapChains,
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
      const service = MultiService.getService();
      const chains = await service.getPublicGateway().getBlockchains();
      const formattedPublicChains = service.formatPublicEndpoints(chains);

      return { chains: formattedPublicChains };
    })(),
  },
  meta: {
    cache: true,
    getData: ({ chains }) => ({
      chains: filterMapChains(chains),
      allChains: filterMapChains(chains),
    }),
  },
}));
