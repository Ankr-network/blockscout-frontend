import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { FantomSDK } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';
import { TFtmSyntToken } from '../types/TFtmSyntToken';

export const addFTMTokenToWallet = createAction<RequestAction<void, void>>(
  `${ACTIONS_PREFIX}addFTMTokenToWallet`,
  (token: TFtmSyntToken) => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk = await FantomSDK.getInstance();

        await sdk.addTokenToWallet(token);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
    },
  }),
);
