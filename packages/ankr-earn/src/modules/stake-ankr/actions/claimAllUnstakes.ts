import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

type TTxHash = string;

export const claimAllUnstakes = createAction<RequestAction<TTxHash, TTxHash>>(
  `${ANKR_ACTIONS_PREFIX}claimAllUnstakes`,
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<TTxHash> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.claimAllUnstakes();
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
    },
  }),
);
