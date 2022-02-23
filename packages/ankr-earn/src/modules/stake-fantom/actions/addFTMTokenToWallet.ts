import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { addAftmbToWallet } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

export const addFTMTokenToWallet = createAction<RequestAction<void, void>>(
  `${ACTIONS_PREFIX}addFTMTokenToWallet`,
  () => ({
    request: {
      promise: (async (): Promise<void> => {
        return addAftmbToWallet();
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
    },
  }),
);
