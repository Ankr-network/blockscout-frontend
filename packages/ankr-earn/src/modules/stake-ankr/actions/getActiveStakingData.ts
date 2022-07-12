import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IActiveStakingData } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const getActiveStakingData = createAction<
  RequestAction<IActiveStakingData[], IActiveStakingData[]>
>(`${ANKR_ACTIONS_PREFIX}getActiveStakingData`, () => ({
  request: {
    promise: (async (): Promise<IActiveStakingData[]> => {
      const sdk = await AnkrStakingSDK.getInstance();

      return sdk.getActiveStaking();
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
