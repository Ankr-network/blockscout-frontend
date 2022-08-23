import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MaticPolygonSDK } from '@ankr.com/staking-sdk';

import { TBNPercent } from 'modules/common/types';
import { withStore } from 'modules/common/utils/withStore';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';

export interface IGetUnstakeStatsData {
  acPoolLiquidity: BigNumber;
  acPoolLiquidityInMATIC: BigNumber;
  unstakeFeePct: TBNPercent;
}

export const getUnstakeStats = createSmartAction<
  RequestAction<IGetUnstakeStatsData, IGetUnstakeStatsData>
>(`${MATIC_POLYGON_ACTIONS_PREFIX}getUnstakeStats`, () => ({
  request: {
    promise: async (): Promise<IGetUnstakeStatsData> => {
      const sdk = await MaticPolygonSDK.getInstance();

      const [acPoolLiquidity, acPoolLiquidityInMATIC, unstakeFeePct] =
        await Promise.all([
          sdk.getACPoolLiquidity(),
          sdk.getACPoolLiquidityInMATIC(),
          sdk.getUnstakeFeePct(),
        ]);

      return {
        acPoolLiquidity,
        acPoolLiquidityInMATIC,
        unstakeFeePct,
      };
    },
  },
  meta: {
    onRequest: withStore,
  },
}));
