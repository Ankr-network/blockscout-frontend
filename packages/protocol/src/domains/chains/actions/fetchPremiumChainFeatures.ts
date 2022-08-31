import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { fetchProvider } from 'domains/infrastructure/actions/fetchProvider';
import { MultiService } from 'modules/api/MultiService';
import { IJwtToken } from 'multirpc-sdk';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { credentialsGuard } from '../../auth/utils/credentialsGuard';
import {
  IApiChain,
  IFetchChainsResponseData,
  mapChains,
} from '../api/queryChains';
import { fetchPublicChains } from './fetchPublicChains';

export interface IPremiumFeatures {
  publicChains: IApiChain[];
  privateChains: IApiChain[];
  privateChainDetails: IApiChain;
}

export const fetchPremiumChainFeatures = createSmartAction<
  RequestAction<IFetchChainsResponseData, IPremiumFeatures>
>('chains/fetchPremiumChainFeatures', (chainId: string) => ({
  request: {
    promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
      const service = await MultiService.getInstance();

      const { data: providerData } = getQuery(store.getState(), {
        type: fetchProvider.toString(),
        action: fetchProvider,
      });

      if (!providerData) {
        await store.dispatchRequest(fetchProvider());
      }

      let { data: publicChains } = getQuery(store.getState(), {
        type: fetchPublicChains.toString(),
        action: fetchPublicChains,
      });

      if (!publicChains) {
        const chains = await MultiService.getPublicInstance().getPublicUrls();
        publicChains = mapChains({ chains });
      }

      const chains = await service.fetchPrivateUrls(jwtToken);
      const privateChains = mapChains({ chains });

      const privateChainDetails = privateChains.find(
        item => item.id === chainId,
      );

      return {
        publicChains,
        privateChains,
        privateChainDetails,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: credentialsGuard,
  },
}));
