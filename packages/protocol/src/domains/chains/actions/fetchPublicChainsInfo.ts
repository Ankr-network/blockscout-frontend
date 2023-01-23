import { IApiChain } from '../api/queryChains';
import { chainsFetchPublicChains } from './fetchPublicChains';
import { chainsFetchChainNodesDetail } from './fetchChainNodesDetail';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getAddIsArchiveCB } from '../utils/addIsArchive';
import { web3Api } from 'store/queries';

export interface IFetchPublicChainsInfoResult {
  chains: IApiChain[];
  allChains: IApiChain[];
}

export const {
  endpoints: { chainsFetchPublicChainsInfo },
  useLazyChainsFetchPublicChainsInfoQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPublicChainsInfo: build.query<
      IFetchPublicChainsInfoResult,
      void
    >({
      queryFn: createNotifyingQueryFn(async (_args, { dispatch }) => {
        const [
          { data: { chains = [], allChains = [] } = {} },
          { data: nodes },
        ] = await Promise.all([
          dispatch(chainsFetchPublicChains.initiate()),
          dispatch(chainsFetchChainNodesDetail.initiate()),
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
