import { Timeframe } from 'multirpc-sdk';
import { ChainID, Chain } from '@ankr.com/chains-list';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import {
  IApiChainDetails,
  chainsFetchChainTimeframeData,
} from './fetchChainTimeframeData';

const addTotalRequests = (
  chain: Chain,
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

type IFetchChainDetailsResponseData = IApiChainDetails;

export const {
  endpoints: { chainsFetchChainDetails },
  useLazyChainsFetchChainDetailsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchChainDetails: build.query<
      IFetchChainDetailsResponseData,
      { chainId: string; timeframe: Timeframe }
    >({
      queryFn: createNotifyingQueryFn(
        async ({ chainId, timeframe }, { dispatch }) => {
          const data = await dispatch(
            chainsFetchChainTimeframeData.initiate({ chainId, timeframe }),
          ).unwrap();

          return { data };
        },
      ),
      onQueryStarted: async ({ chainId }, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        dispatch(
          web3Api.util.updateQueryData(
            'chainsFetchPublicChainsInfo' as unknown as never,
            undefined as unknown as never,
            (mutationData: any) => {
              Object.assign(mutationData, {
                chains: mutationData.chains.map((chain: any) =>
                  addTotalRequests(chain, chainId as ChainID, data),
                ),
                allChains: mutationData.allChains.map((chain: any) =>
                  addTotalRequests(chain, chainId as ChainID, data),
                ),
              });
            },
          ),
        );
      },
    }),
  }),
});
