import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { Store } from 'store';
import { ChainId, MAP_CHAIN_ID_TO_DETAILS_ID } from '../api/chain';
import { IApiChain } from '../api/queryChains';
import {
  getRPCUrl,
  isHorizenTestnetEvm,
  isPolygonZkEvm,
  isTenetEvm,
} from './fetchChainUtils';
import { fetchPublicChains } from './fetchPublicChains';
import { isDev } from 'modules/common/utils/isProd';

export interface IChainItemDetails {
  chain?: IApiChain;
}

const CHAIN_ID_FOR_BLOCKCHAINS_LIST = 'polygon_zkevm';

export const fetchChain = createSmartAction<
  RequestAction<null, IChainItemDetails>
>('chains/fetchChain', (chainId: ChainId) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    requestKey: chainId,
    poll: 30,
    onRequest: (
      request: any,
      action: RequestAction,
      store: Store & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async (): Promise<IChainItemDetails> => {
          const { data: chains } = await store.dispatchRequest(
            fetchPublicChains(),
          );

          let currentChainId = chainId;

          if (isPolygonZkEvm(chainId) && isDev()) {
            currentChainId = CHAIN_ID_FOR_BLOCKCHAINS_LIST as ChainId;
          } else if (isTenetEvm(chainId)) {
            currentChainId = MAP_CHAIN_ID_TO_DETAILS_ID[chainId] as ChainId;
          } else if (isHorizenTestnetEvm(chainId)) {
            currentChainId = MAP_CHAIN_ID_TO_DETAILS_ID[chainId] as ChainId;
          }

          const chain = chains?.find(item => item.id === currentChainId);

          const rpcUrl = getRPCUrl(chainId);

          if (!chain) {
            return { chain };
          }

          return {
            chain: {
              ...chain,
              id: chainId,
              rpcUrls: [rpcUrl],
            },
          };
        })(),
      };
    },
  },
}));
