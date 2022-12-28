import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getBinanceSDK } from '../utils/getBinanceSDK';

interface IFetchUnstakeStatsResponseData {
  minAbnbbUnstake: BigNumber;
  minAbnbcUnstake: BigNumber;
  poolBalance: BigNumber;
  instantFee: BigNumber;
}

export const { useGetBNBUnstakeStatsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBUnstakeStats: build.query<IFetchUnstakeStatsResponseData, void>({
      queryFn: queryFnNotifyWrapper<
        void,
        never,
        IFetchUnstakeStatsResponseData
      >(async () => {
        const sdk = await getBinanceSDK();

        const [minimumStake, aBNBcRatio, poolBalance, instantFee] =
          await Promise.all([
            sdk.getMinimumStake(),
            sdk.getACRatio(),
            sdk.getWBNBSwapPoolBalance(),
            sdk.getSwapPoolUnstakeFee(),
          ]);

        return {
          data: {
            minAbnbbUnstake: minimumStake,
            minAbnbcUnstake: minimumStake.multipliedBy(aBNBcRatio),
            poolBalance,
            instantFee,
          },
        };
      }),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
