import { INodesDetailEntity } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { ChainID } from 'modules/chains/types';

export const {
  endpoints: { chainsFetchChainNodesDetail },
  useLazyChainsFetchChainNodesDetailQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchChainNodesDetail: build.query<
      INodesDetailEntity[],
      ChainID | string | void
    >({
      queryFn: createNotifyingQueryFn(async chainId => {
        const data = await MultiService.getService()
          .getPublicGateway()
          .getNodesDetail();

        const nodesDetail = chainId
          ? data.filter(item => chainId === item.id)
          : data;

        return { data: nodesDetail };
      }),
    }),
  }),
});
