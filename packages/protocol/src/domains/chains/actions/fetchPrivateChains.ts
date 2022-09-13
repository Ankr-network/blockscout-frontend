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

export interface IFetchPrivateChainsResult {
  chains: IApiChain[];
  allChains: IApiChain[];
}

export const fetchPrivateChains = createSmartAction<
  RequestAction<IFetchChainsResponseData, IFetchPrivateChainsResult>
>('chains/fetchPrivateChains', () => ({
  request: {
    promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
      const service = await MultiService.getInstance();
      const chains = await service.getPublicGateway().getBlockchains();
      const formattedPrivateChains = await service.formatPrivateChains(
        chains,
        jwtToken,
      );

      const publicService = await MultiService.getPublicInstance();
      const formattedPublicChains = await publicService.formatPublicChains(
        chains,
      );

      return {
        chains: formattedPrivateChains,
        allChains: formattedPublicChains,
      };
    },
  },
  meta: {
    asMutation: false,
    getData: ({ chains, allChains }) => ({
      chains: filterMapChains(chains),
      allChains: filterMapChains(allChains),
    }),
    onRequest: credentialsGuard,
  },
}));
