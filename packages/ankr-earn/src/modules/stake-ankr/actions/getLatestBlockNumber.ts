import { web3Api } from 'modules/api/web3Api';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

export const {
  useGetLatestBlockNumberQuery,
  endpoints: { getLatestBlockNumber },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getLatestBlockNumber: build.query<number, void>({
      queryFn: queryFnNotifyWrapper<void, never, number>(async () => {
        const sdk = await AnkrStakingSDK.getInstance();

        const data = await sdk.getBlockNumber();

        return { data };
      }),
    }),
  }),
});

export const selectLatestBlockNumber = getLatestBlockNumber.select();
