import { ITxEventsHistoryData } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export const { useLazyGetMaticOnEthTotalHistoryQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      getMaticOnEthTotalHistory: build.query<ITxEventsHistoryData, void>({
        queryFn: queryFnNotifyWrapper<void, never, ITxEventsHistoryData>(
          async () => {
            const sdk = await getPolygonOnEthereumSDK();

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
