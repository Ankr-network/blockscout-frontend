import BigNumber from 'bignumber.js';

import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';
import { TBNPercent } from 'modules/common/types';

import { CacheTags } from '../const';

export interface IGetUnstakeStatsData {
  maticPoolLiquidityInAC: BigNumber;
  unstakeFeePct: TBNPercent;
}

export const { useGetMaticOnPolygonUnstakeStatsQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      getMaticOnPolygonUnstakeStats: build.query<IGetUnstakeStatsData, void>({
        queryFn: queryFnNotifyWrapper<void, never, IGetUnstakeStatsData>(
          async () => {
            const sdk = await PolygonOnPolygonSDK.getInstance();

            const [maticPoolLiquidityInAC, unstakeFeePct] = await Promise.all([
              sdk.getMATICPoolLiquidityInAC(),
              sdk.getUnstakeFeePct(),
            ]);

            return {
              data: {
                maticPoolLiquidityInAC,
                unstakeFeePct,
              },
            };
          },
        ),
        keepUnusedDataFor: ACTION_CACHE_SEC,
        providesTags: [CacheTags.common],
      }),
    }),
  });
