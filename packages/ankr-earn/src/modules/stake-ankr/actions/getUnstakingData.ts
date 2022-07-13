import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IUnstakingData } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const getUnstakingData = createAction<
  RequestAction<IUnstakingData[], IUnstakingData[]>
>(`${ANKR_ACTIONS_PREFIX}getUnstakingData`, () => ({
  request: {
    promise: (async (): Promise<IUnstakingData[]> => {
      const sdk = await AnkrStakingSDK.getInstance();

      return sdk.getUnstaking();
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
