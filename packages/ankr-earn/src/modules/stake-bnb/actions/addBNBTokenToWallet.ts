import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { BinanceSDK } from '../api/BinanceSDK';

export const addBNBTokenToWallet = createAction<RequestAction<void, void>>(
  'bnb/addBNBTokenToWallet',
  () => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk = await BinanceSDK.getInstance();

        return sdk.addABNBBToWallet();
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
    },
  }),
);
