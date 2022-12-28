import { IApiChain } from '../api/queryChains';
import { chainsFetchChainNodes } from './fetchChainNodes';
import { chainsFetchPrivateChains } from './fetchPrivateChains';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getAddIsArchiveCB } from '../utils/addIsArchive';
import { web3Api } from 'store/queries';

export interface IFetchPrivateChainsInfoResult {
  chains: IApiChain[];
  allChains: IApiChain[];
}

export const {
  endpoints: { chainsFetchPrivateChainsInfo },
  useLazyChainsFetchPrivateChainsInfoQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateChainsInfo: build.query<
      IFetchPrivateChainsInfoResult,
      void
    >({
      queryFn: createNotifyingQueryFn(async (_args, { dispatch }) => {
        const [
          { data: { chains = [], allChains = [] } = {} },
          { data: nodes },
        ] = await Promise.all([
          dispatch(chainsFetchPrivateChains.initiate()),
          dispatch(chainsFetchChainNodes.initiate(undefined)),
        ]);

        const addIsArchive = getAddIsArchiveCB(nodes);

        return {
          data: {
            chains: chains.map(addIsArchive),
            allChains: allChains.map(addIsArchive),
          },
        };
      }),
    }),
  }),
});
