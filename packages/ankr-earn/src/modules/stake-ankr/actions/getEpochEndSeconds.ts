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
        request.promise = (async () => {
          const sdk = await AnkrStakingSDK.getInstance();
          const provider = await sdk.getProvider();

          return sdk.getEpochEndSeconds(await provider.getBlockNumber());
        })();

        return request;
      },
    },
  }),
);
