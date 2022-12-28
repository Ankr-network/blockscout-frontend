import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getAvalancheSDK } from '../utils/getAvalancheSDK';

export interface IFetchStatsResponseData {
  aAVAXbBalance: BigNumber;
  aAVAXcBalance: BigNumber;
  avaxBalance: BigNumber;
  aAVAXcRatio: BigNumber;
}

export const { useGetAVAXCommonDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAVAXCommonData: build.query<IFetchStatsResponseData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IFetchStatsResponseData>(
        async () => {
          const sdk = await getAvalancheSDK();

          const [aAVAXbBalance, aAVAXcBalance, avaxBalance, ratio] =
            await Promise.all([
              sdk.getABBalance(),
              sdk.getACBalance(),
              sdk.getAVAXBalance(),
              sdk.getACRatio(),
            ]);

          return {
            data: {
              aAVAXbBalance,
              aAVAXcBalance,
              avaxBalance,
              aAVAXcRatio: ratio,
            },
          };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
