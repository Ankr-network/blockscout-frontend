import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { FantomSDK } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

export const addFTMTokenToWallet = createAction<RequestAction<void, void>>(
  `${ACTIONS_PREFIX}addFTMTokenToWallet`,
  () => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk = await FantomSDK.getInstance();

        return sdk.addAftmbToWallet();
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
    },
  }),
);
