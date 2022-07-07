import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

type TTxHash = string;

export const claimAll = createAction<RequestAction<TTxHash, TTxHash>>(
  `${ANKR_ACTIONS_PREFIX}claimAll`,
  () => ({
    request: {
      promise: (async (): Promise<TTxHash> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.claimAllRewards();
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
    },
  }),
);
