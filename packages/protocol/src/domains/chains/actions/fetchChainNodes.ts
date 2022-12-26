import { INodeEntity } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { chainsFetchChainNodes },
  useLazyChainsFetchChainNodesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchChainNodes: build.query<INodeEntity[], string | undefined>({
      queryFn: createNotifyingQueryFn(async blockchain => {
        const nodes = await MultiService.getService()
          .getPublicGateway()
          .getNodes(blockchain);

        return { data: nodes };
      }),
    }),
  }),
});
