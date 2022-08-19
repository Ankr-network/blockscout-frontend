import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ZERO } from 'modules/common/const';

import { MGNO_ACTIONS_PREFIX } from '../const';

interface IGetProvidersTotalInfo {
  totalTVL: BigNumber;
  totalDelegatedAmount: BigNumber;
  lockingPeriod: number;
  rewards24h: BigNumber;
  rewards30d: BigNumber;
}

export const getProvidersTotalInfo = createAction<
  RequestAction<IGetProvidersTotalInfo, IGetProvidersTotalInfo>
>(`${MGNO_ACTIONS_PREFIX}getProvidersTotalInfo`, () => ({
  request: {
    promise: (async (): Promise<IGetProvidersTotalInfo> => {
      return {
        totalTVL: ZERO.plus(12),
        totalDelegatedAmount: ZERO.plus(1231),
        lockingPeriod: 1,
        rewards24h: ZERO.plus(10),
        rewards30d: ZERO.plus(300),
      };
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
