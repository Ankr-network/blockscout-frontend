import { connect } from 'near-api-js';

import { getNearConnectionConfig } from 'domains/requestComposer/constants/near';
import { web3Api } from 'store/queries';

export const {
  endpoints: { chainsFetchNearLastBlockNumber },
  useChainsFetchNearLastBlockNumberQuery,
  useLazyChainsFetchNearLastBlockNumberQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchNearLastBlockNumber: build.query<number, string>({
      queryFn: async web3URL => {
        const nearConnection = await connect(getNearConnectionConfig(web3URL));

        const { provider } = nearConnection.connection;

        const block = await provider.block({ finality: 'optimistic' });

        return { data: block.header.height };
      },
      onQueryStarted: async (_args, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          // do nothing in case of error
        }
      },
    }),
  }),
});
