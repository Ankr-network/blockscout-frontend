import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { IHistoryData } from '../api/GnosisStakingSDK/types';
import { MGNO_ACTIONS_PREFIX } from '../const';

export const getHistoryData = createAction<
  RequestAction<IHistoryData[], IHistoryData[]>
>(`${MGNO_ACTIONS_PREFIX}getHistoryData`, () => ({
  request: {
    promise: (async (): Promise<IHistoryData[]> => {
      const sdk = await GnosisStakingSDK.getInstance();
      return sdk.getHistoryData();
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
