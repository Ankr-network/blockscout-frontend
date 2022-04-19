import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IApiChain, IFetchChainsResponseData } from '../api/queryChains';
import { credentialsGuard } from '../../../modules/auth/utils/credentialsGuard';
import { fetchProvider } from 'domains/nodeProviders/actions/fetchProvider';
import { fetchPrivateChains } from './fetchPrivateChains';
import { fetchPrivateChainDetails } from './fetchPrivateChainDetails';
import {
  fetchEndpoints,
  IEndpoint,
} from 'domains/nodeProviders/actions/fetchEndpoints';

interface IPremiumFeatures {
  privateChains: IApiChain[];
  privateChainDetails: IApiChain;
  endpoints: IEndpoint[];
}

export const fetchPremiumChainFeatures = createSmartAction<
  RequestAction<IFetchChainsResponseData, IPremiumFeatures>
>('chains/fetchPremiumChainFeatures', (chainId: string) => ({
  request: {
    promise: async (store: RequestsStore) => {
      const { data: providerData } = getQuery(store.getState(), {
        type: fetchProvider.toString(),
        action: fetchProvider,
      });

      if (!providerData) {
        await store.dispatchRequest(fetchProvider());
      }

      const { data: endpoints } = await store.dispatchRequest(fetchEndpoints());

      const { data: privateChains } = await store.dispatchRequest(
        fetchPrivateChains(),
      );
      const { data: privateChainDetails } = await store.dispatchRequest(
        fetchPrivateChainDetails(chainId),
      );

      return {
        privateChains,
        privateChainDetails,
        endpoints,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: credentialsGuard,
  },
}));
