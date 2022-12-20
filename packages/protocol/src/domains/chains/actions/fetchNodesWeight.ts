import { IWorkerNodesWeight } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  useChainsFetchNodesWeightQuery,
  endpoints: { chainsFetchNodesWeight },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchNodesWeight: build.query<IWorkerNodesWeight[], void>({
      queryFn: createNotifyingQueryFn(async () => {
        const data = await MultiService.getService()
          .getPublicGateway()
          .getNodesWeight();

        return { data };
      }),
    }),
  }),
});
