import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { Chain } from '../../types';
import { chainsFetchChainNodesDetail } from '../fetchChainNodesDetail';
import { chainsFetchPrivateChains } from './fetchPrivateChains';
import { getAddIsArchiveCB } from '../../utils/addIsArchive';

export interface IFetchPrivateChainsInfoResult {
  chains: Chain[];
  allChains: Chain[];
}

interface Params {
  userEndpointToken?: string;
}

export const {
  endpoints: { chainsFetchPrivateChainsInfo },
  useLazyChainsFetchPrivateChainsInfoQuery,
  useChainsFetchPrivateChainsInfoQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateChainsInfo: build.query<
      IFetchPrivateChainsInfoResult,
      Params
    >({
      queryFn: createNotifyingQueryFn(
        async ({ userEndpointToken }, { dispatch }) => {
          const [
            { data: { chains = [], allChains = [] } = {} },
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
