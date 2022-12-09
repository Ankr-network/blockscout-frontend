import BigNumber from 'bignumber.js';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';

interface IFetchStatsResponseData {
  aBNBbBalance: BigNumber;
  aBNBcBalance: BigNumber;
  bnbBalance: BigNumber;
  aBNBcRatio: BigNumber;
  aETHBalance: BigNumber;
  aETHRatio: BigNumber;
}

export const { useGetBNBStatsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBStats: build.query<IFetchStatsResponseData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IFetchStatsResponseData>(
        async () => {
          const sdk = await BinanceSDK.getInstance();

          const [
            aBNBbBalance,
            bnbBalance,
            aBNBcRatio,
            aBNBcBalance,
            aETHBalance,
            aETHRatio,
          ] = await Promise.all([
            sdk.getABBalance(),
            sdk.getBNBBalance(),
            sdk.getACRatio(),
            sdk.getACBalance(),
            sdk.getAETHBalance(),
            sdk.getAETHRatio(),
          ]);

          return {
            data: {
              aBNBbBalance,
              aBNBcBalance,
              bnbBalance,
              aBNBcRatio,
              aETHBalance,
              aETHRatio,
            },
          };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
