import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

interface IGetCommonData {
  ankrBalance: BigNumber;
  minStake: BigNumber;
  lockingPeriod: number;
}

export const getCommonData = createAction<
  RequestAction<IGetCommonData, IGetCommonData>
>(`${ANKR_ACTIONS_PREFIX}getCommonData`, () => ({
  request: {
    promise: (async (): Promise<IGetCommonData> => {
      const sdk = await AnkrStakingSDK.getInstance();
      const [ankrBalance, minStake, lockingPeriod] = await Promise.all([
        sdk.getAnkrBalance(),
        sdk.getMinimumStake(),
        sdk.getLockingPeriod(),
      ]);

      return { ankrBalance, minStake, lockingPeriod };
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
