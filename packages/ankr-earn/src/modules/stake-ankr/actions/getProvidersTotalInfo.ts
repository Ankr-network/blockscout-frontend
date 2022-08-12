import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

interface IGetProvidersTotalInfo {
  totalTVL: BigNumber;
  totalDelegatedAmount: BigNumber;
  lockingPeriod: number;
  rewards24h: BigNumber;
  rewards30d: BigNumber;
}

export const getProvidersTotalInfo = createAction<
  RequestAction<IGetProvidersTotalInfo, IGetProvidersTotalInfo>
>(`${ANKR_ACTIONS_PREFIX}getProvidersTotalInfo`, () => ({
  request: {
    promise: (async (): Promise<IGetProvidersTotalInfo> => {
      const sdk = await AnkrStakingSDK.getInstance();

      const [
        totalTVL,
        totalDelegatedAmount,
        lockingPeriod,
        rewards24h,
        rewards30d,
      ] = await Promise.all([
        sdk.getTotalTVL(),
        sdk.getMyTotalDelegatedAmount(),
        sdk.getLockingPeriodDays(),
        sdk.getRewards(24),
        sdk.getRewards(24 * 30),
      ]);

      // todo: use actual data
      return {
        totalTVL,
        totalDelegatedAmount,
        lockingPeriod,
        rewards24h,
        rewards30d,
      };
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
