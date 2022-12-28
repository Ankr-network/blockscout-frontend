import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';

import { CacheTags } from '../const';
import { getBinanceSDK } from '../utils/getBinanceSDK';

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
          const sdk = await getBinanceSDK();

          let aBNBbBalance = ZERO;

          try {
            aBNBbBalance = await sdk.getABBalance();
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(
              `Known error on getting aBNBb data. Zero balance returned. Original response ${error}`,
            );
          }

          const [bnbBalance, aBNBcRatio, aBNBcBalance, aETHBalance, aETHRatio] =
            await Promise.all([
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
