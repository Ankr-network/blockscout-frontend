import { BinanceSDK, ITxEventsHistoryData } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';

export const { useLazyGetBNBTotalHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBTotalHistory: build.query<ITxEventsHistoryData, void>({
      queryFn: queryFnNotifyWrapper<void, never, ITxEventsHistoryData>(
        async () => {
          const sdk: BinanceSDK = await BinanceSDK.getInstance();

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
