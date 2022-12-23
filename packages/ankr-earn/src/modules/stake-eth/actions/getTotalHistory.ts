import { EthereumSDK, ITxEventsHistoryData } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';

export const { useLazyGetETHTotalHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHTotalHistory: build.query<ITxEventsHistoryData, void>({
      queryFn: queryFnNotifyWrapper<void, never, ITxEventsHistoryData>(
        async () => {
          const sdk = await EthereumSDK.getInstance();

          return {
            data: await sdk.getTxEventsHistory(),
          };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
