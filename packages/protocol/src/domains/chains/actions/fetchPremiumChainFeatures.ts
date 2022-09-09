import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { fetchProvider } from 'domains/infrastructure/actions/fetchProvider';
import { MultiService } from 'modules/api/MultiService';
import { IJwtToken } from 'multirpc-sdk';
import { credentialsGuard } from '../../auth/utils/credentialsGuard';
import {
  filterMapChains,
  IApiChain,
  IFetchChainsResponseData,
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

      let {
        data: { chains: publicChains },
      } = getQuery(store.getState(), {
        type: fetchPublicChains.toString(),
        action: fetchPublicChains,
        defaultData: {},
      });

      const blockchains = await service.getPublicGateway().getBlockchains();

      if (!publicChains) {
        const formattedPublicChains =
          await MultiService.getPublicInstance().formatPublicChains(
            blockchains,
          );

        publicChains = filterMapChains(
          formattedPublicChains,
          ({ blockchain }) => !blockchain.premiumOnly,
        );
      }

      const formattedPrivateChains = await service.formatPrivateChains(
        blockchains,
        jwtToken,
      );
      const privateChains = filterMapChains(formattedPrivateChains);

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
