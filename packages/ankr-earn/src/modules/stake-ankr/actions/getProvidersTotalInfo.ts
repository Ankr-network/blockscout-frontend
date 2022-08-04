import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ZERO } from 'modules/common/const';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

interface IGetProvidersTotalInfo {
  currentHighestAPY: number;
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

      const [totalTVL, totalDelegatedAmount, lockingPeriod] = await Promise.all(
        [
          sdk.getTotalTVL(),
          sdk.getTotalDelegatedAmount(),
          sdk.getLockingPeriodDays(),
        ],
      );

      // todo: use actual data
      return {
        currentHighestAPY: 0,
        totalTVL,
        totalDelegatedAmount,
        lockingPeriod,
        rewards24h: ZERO,
        rewards30d: ZERO,
      };
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
