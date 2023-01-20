import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC, ONE } from 'modules/common/const';

import { CacheTags } from '../const';
import { getBinanceSDK } from '../utils/getBinanceSDK';

export const BNB_UNSTAKING_MAX_DECIMALS_LEN = 18;

interface IFetchUnstakeStatsResponseData {
  minAbnbbUnstake: BigNumber;
  minAbnbcUnstake: BigNumber;
  poolBalance: BigNumber;
  unstakeFeePct: BigNumber;
  maxAnkrBnbAmount: BigNumber;
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

        const [
          minimumStake,
          aBNBcRatio,
          poolBalance,
          unstakeFee,
          swapPoolMaxFee,
        ] = await Promise.all([
          sdk.getMinimumStake(),
          sdk.getACRatio(),
          sdk.getBNBSwapPoolLiquidity(),
          sdk.getSwapPoolUnstakeFee(),
          sdk.getBNBSwapPoolMaxFee(),
        ]);

        const maxBNBamount = calcMaxPoolUnstake({
          poolBalance,
          unstakeFee,
          swapPoolMaxFee,
        });

        const data: IFetchUnstakeStatsResponseData = {
          minAbnbbUnstake: minimumStake,
          minAbnbcUnstake: minimumStake.multipliedBy(aBNBcRatio),
          poolBalance,
          unstakeFeePct: unstakeFee.dividedBy(100),
          maxAnkrBnbAmount: maxBNBamount
            .multipliedBy(aBNBcRatio)
            .decimalPlaces(
              BNB_UNSTAKING_MAX_DECIMALS_LEN,
              BigNumber.ROUND_DOWN,
            ),
        };

        return { data };
      }),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});

// todo: probably should be moved to sdk
function calcMaxPoolUnstake(params: {
  poolBalance: BigNumber;
  unstakeFee: BigNumber;
  swapPoolMaxFee: BigNumber;
}) {
  // SwapPool.getAvailableLiquidity() / (1 - SwapPool.unstakeFee() / SwapPool.FEE_MAX())
  const { poolBalance, unstakeFee, swapPoolMaxFee } = params;
  return poolBalance.dividedBy(ONE.minus(unstakeFee.dividedBy(swapPoolMaxFee)));
}
