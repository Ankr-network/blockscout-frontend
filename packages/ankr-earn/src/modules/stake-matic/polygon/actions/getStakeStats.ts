import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MaticPolygonSDK } from '@ankr.com/staking-sdk';

import { withStore } from 'modules/common/utils/withStore';

export interface IGetStakeStatsData {
  acPoolLiquidityInMATIC: BigNumber;
  acRatio: BigNumber;
  maticBalance: BigNumber;
  stakeFeePct: BigNumber;
}

export const getStakeStats = createSmartAction<
  RequestAction<IGetStakeStatsData, IGetStakeStatsData>
>('matic/polygon/getStakeStats', () => ({
  request: {
    promise: async (): Promise<IGetStakeStatsData> => {
      const sdk = await MaticPolygonSDK.getInstance();

      const [acPoolLiquidityInMATIC, acRatio, maticBalance, stakeFeePct] =
        await Promise.all([
          sdk.getACPoolLiquidityInMATIC(),
          sdk.getACRatio(),
          sdk.getMaticBalance(),
          sdk.getStakeFeePct(),
        ]);

      return {
        acPoolLiquidityInMATIC,
        acRatio,
        maticBalance,
        stakeFeePct,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
  },
}));
