import BigNumber from 'bignumber.js';

import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';
import { TBNPercent } from 'modules/common/types';

import { CacheTags } from '../const';

export interface IGetStakeStatsData {
  acPoolLiquidityInMATIC: BigNumber;
  stakeFeePct: TBNPercent;
}

export const { useGetMaticOnPolygonStakeStatsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnPolygonStakeStats: build.query<IGetStakeStatsData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IGetStakeStatsData>(
        async () => {
          const sdk = await PolygonOnPolygonSDK.getInstance();

          const [acPoolLiquidityInMATIC, stakeFeePct] = await Promise.all([
            sdk.getACPoolLiquidityInMATIC(),
            sdk.getStakeFeePct(),
          ]);

          return {
            data: {
              acPoolLiquidityInMATIC,
              stakeFeePct,
            },
          };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
