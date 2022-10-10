import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { TBNPercent } from 'modules/common/types';
import { withStore } from 'modules/common/utils/withStore';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';

export interface IGetStakeStatsData {
  acPoolLiquidityInMATIC: BigNumber;
  stakeFeePct: TBNPercent;
}

export const getStakeStats = createSmartAction<
  RequestAction<IGetStakeStatsData, IGetStakeStatsData>
>(`${MATIC_POLYGON_ACTIONS_PREFIX}getStakeStats`, () => ({
  request: {
    promise: async (): Promise<IGetStakeStatsData> => {
      const sdk = await PolygonOnPolygonSDK.getInstance();

      const [acPoolLiquidityInMATIC, stakeFeePct] = await Promise.all([
        sdk.getACPoolLiquidityInMATIC(),
        sdk.getStakeFeePct(),
      ]);

      return {
        acPoolLiquidityInMATIC,
        stakeFeePct,
      };
    },
  },
  meta: {
    onRequest: withStore,
  },
}));
