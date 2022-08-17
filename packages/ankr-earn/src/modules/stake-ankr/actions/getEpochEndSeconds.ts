import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

const POLL_INTERVAL_SECONDS = 30;

export const getEpochEndSeconds = createAction<RequestAction<number, number>>(
  `${ANKR_ACTIONS_PREFIX}getEpochEndSeconds`,
  () => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      showNotificationOnError: true,
      poll: POLL_INTERVAL_SECONDS,
      onRequest: request => {
        request.promise = AnkrStakingSDK.getInstance().then(sdk =>
          sdk.getEpochEndSeconds(),
        );

        return request;
      },
    },
  }),
);
