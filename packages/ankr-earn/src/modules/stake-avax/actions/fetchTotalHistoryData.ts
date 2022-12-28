import { ITxEventsHistoryData } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getAvalancheSDK } from '../utils/getAvalancheSDK';

export const { useLazyGetAVAXTotalHistoryDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAVAXTotalHistoryData: build.query<ITxEventsHistoryData, void>({
      queryFn: queryFnNotifyWrapper<void, never, ITxEventsHistoryData>(
        async () => {
          const sdk = await getAvalancheSDK();

          return { data: await sdk.getTxEventsHistory() };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
