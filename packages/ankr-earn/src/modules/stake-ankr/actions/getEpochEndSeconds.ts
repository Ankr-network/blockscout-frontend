import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const getEpochEndSeconds = createAction<RequestAction<number, number>>(
  `${ANKR_ACTIONS_PREFIX}getEpochEndSeconds`,
  () => ({
    request: {
      promise: (async () => {
        const sdk = await AnkrStakingSDK.getInstance();
        return sdk.getEpochEndSeconds();
      })(),
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
