import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IJwtToken, WorkerTokenData } from 'multirpc-sdk';
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
    promise: async (
      store: RequestsStore,
      jwtToken: IJwtToken,
      workerTokenData: WorkerTokenData,
    ) => {
      const publicService = MultiService.getService();

      const chains = await publicService.getPublicGateway().getBlockchains();
      const formattedPrivateChains = workerTokenData?.userEndpointToken
        ? publicService.formatPrivateEndpoints(
            chains,
            workerTokenData?.userEndpointToken,
          )
        : publicService.formatPublicEndpoints(chains);

      const formattedPublicChains = publicService.formatPublicEndpoints(chains);

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
