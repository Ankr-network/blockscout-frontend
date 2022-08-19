import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MaticPolygonSDK } from '@ankr.com/staking-sdk';

import { withStore } from 'modules/common/utils/withStore';

export interface IGetStatsData {
  acPoolLiquidityInMATIC: BigNumber;
  acRatio: BigNumber;
  maticBalance: BigNumber;
  stakeFee: BigNumber;
  unstakeFee: BigNumber;
}

export const getStats = createSmartAction<
  RequestAction<IGetStatsData, IGetStatsData>
>('matic/polygon/getStats', () => ({
  request: {
    promise: async (): Promise<IGetStatsData> => {
      const sdk = await MaticPolygonSDK.getInstance();

      const [
        acPoolLiquidityInMATIC,
        acRatio,
        maticBalance,
        stakeFee,
        unstakeFee,
      ] = await Promise.all([
        sdk.getACPoolLiquidityInMATIC(),
        sdk.getACRatio(),
        sdk.getMaticBalance(),
        sdk.getStakeFee(),
        sdk.getUnstakeFee(),
      ]);

      return {
        acPoolLiquidityInMATIC,
        acRatio,
        maticBalance,
        stakeFee,
        unstakeFee,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
  },
}));
