import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { IJwtToken, WorkerTokenData } from 'multirpc-sdk';
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
    promise: async (
      store: RequestsStore,
      _jwtToken: IJwtToken,
      workerTokenData: WorkerTokenData,
    ) => {
      const publicService = MultiService.getService();

      let {
        data: { chains: publicChains },
      } = getQuery(store.getState(), {
        type: fetchPublicChains.toString(),
        action: fetchPublicChains,
        defaultData: {},
      });

      const blockchains = await publicService
        .getPublicGateway()
        .getBlockchains();

      if (!publicChains) {
        const formattedPublicChains = await publicService.formatPublicEndpoints(
          blockchains,
        );

        publicChains = filterMapChains(
          formattedPublicChains,
          ({ blockchain }) => !blockchain.premiumOnly,
        );
      }

      const formattedPrivateChains = publicService.formatPrivateEndpoints(
        blockchains,
        workerTokenData?.userEndpointToken,
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
    onRequest: credentialsGuard,
  },
}));
