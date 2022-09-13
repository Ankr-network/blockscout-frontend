import { RequestAction, RequestsStore } from '@redux-requests/core';
import { IWorkerGlobalStatus, Timeframe } from 'multirpc-sdk';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { ChainID } from 'modules/chains/types';
import { IApiChain } from '../api/queryChains';
import {
  fetchChainTimeframeData,
  IApiChainDetails,
} from './fetchChainTimeframeData';
import { fetchPublicChainsInfo } from './fetchPublicChainsInfo';

const addTotalRequests = (
  chain: IApiChain,
  chainId: ChainID,
  mutationData: IApiChainDetails,
) => {
  if (chain.id === chainId) {
    return {
      ...chain,
      totalRequests: mutationData.totalRequests,
    };
  }

  return chain;
};

type IFetchChainDetailsResponseData = IWorkerGlobalStatus;

export const fetchChainDetails = createSmartAction<
  RequestAction<IFetchChainDetailsResponseData, IApiChainDetails>
>(
  'chains/fetchChainDetails',
  (chainId: string, timeframe: Timeframe, poll?: number) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      requestKey: chainId,
      takeLatest: false,
      cache: false,
      poll,
      onRequest: (
        request: any,
        action: RequestAction,
        store: RequestsStore,
      ) => {
        return {
          promise: (async () => {
            const { data } = await store.dispatchRequest(
              fetchChainTimeframeData(chainId, timeframe),
            );

            return data;
          })(),
        };
      },
      asMutation: true,
      mutations: {
        [fetchPublicChainsInfo.toString()]: (
          {
            chains = [],
            allChains = [],
          }: ResponseData<typeof fetchPublicChainsInfo>,
          mutationData: IApiChainDetails,
        ): ResponseData<typeof fetchPublicChainsInfo> => ({
          chains: chains.map(chain =>
            addTotalRequests(chain, chainId as ChainID, mutationData),
          ),
          allChains: allChains.map(chain =>
            addTotalRequests(chain, chainId as ChainID, mutationData),
          ),
        }),
      },
    },
  }),
);
