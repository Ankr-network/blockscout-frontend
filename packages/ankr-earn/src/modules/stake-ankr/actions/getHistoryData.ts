import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IHistoryData } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const getHistoryData = createAction<
  RequestAction<IHistoryData[], IHistoryData[]>
>(`${ANKR_ACTIONS_PREFIX}getHistoryData`, () => ({
  request: {
    promise: (async (): Promise<IHistoryData[]> => {
      const sdk = await AnkrStakingSDK.getInstance();

      return sdk.getAllEventsHistory();
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
