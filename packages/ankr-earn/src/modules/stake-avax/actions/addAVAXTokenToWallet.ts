import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { Token } from 'modules/common/types/token';

import { AvalancheSDK } from '../api/AvalancheSDK';

export const addAVAXTokenToWallet = createAction<RequestAction<void, void>>(
  'avax/addAVAXTokenToWallet',
  (token: Token) => ({
    request: {
      promise: (async (): Promise<boolean> => {
        const sdk = await AvalancheSDK.getInstance();

        return sdk.addTokenToWallet(token);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
    },
  }),
);
