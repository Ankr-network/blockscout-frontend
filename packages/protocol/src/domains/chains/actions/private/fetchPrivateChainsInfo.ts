import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { Chain } from 'modules/chains/types';
import { chainsFetchChainNodesDetail } from 'modules/chains/actions/fetchChainNodesDetail';
import { getAddIsArchiveCB } from 'modules/chains/utils/isArchive';

import { chainsFetchPrivateChains } from './fetchPrivateChains';

export interface IFetchPrivateChainsInfoResult {
  chains: Chain[];
  allChains: Chain[];
}

interface Params {
  userEndpointToken?: string;
}

export const {
  endpoints: { chainsFetchPrivateChainsInfo },
  useChainsFetchPrivateChainsInfoQuery,
  useLazyChainsFetchPrivateChainsInfoQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateChainsInfo: build.query<
      IFetchPrivateChainsInfoResult,
      Params
    >({
      queryFn: createNotifyingQueryFn(
        async ({ userEndpointToken }, { dispatch }) => {
          const [
            { data: { allChains = [], chains = [] } = {} },
            { data: nodes },
          ] = await Promise.all([
            dispatch(chainsFetchPrivateChains.initiate(userEndpointToken)),
            dispatch(chainsFetchChainNodesDetail.initiate()),
          ]);

          const addIsArchive = getAddIsArchiveCB(nodes);

          return {
            data: {
              chains: chains.map(addIsArchive),
              allChains: allChains.map(addIsArchive),
            },
          };
        },
      ),
    }),
  }),
});
