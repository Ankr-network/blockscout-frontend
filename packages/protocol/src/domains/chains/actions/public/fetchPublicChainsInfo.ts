import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { Chain } from '../../types';
import { chainsFetchPublicChains } from './fetchPublicChains';
import { chainsFetchChainNodesDetail } from '../fetchChainNodesDetail';
import { getAddIsArchiveCB } from '../../utils/addIsArchive';

export interface IFetchPublicChainsInfoResult {
  chains: Chain[];
  allChains: Chain[];
}

export const { endpoints, useChainsFetchPublicChainsInfoQuery } =
  web3Api.injectEndpoints({
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
