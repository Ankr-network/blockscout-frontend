import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { PolygonSDK } from '../api/PolygonSDK';

export const addMATICTokenToWallet = createAction<RequestAction<void, void>>(
  'polygon/addMATICTokenToWallet',
  () => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk = await PolygonSDK.getInstance();

        return sdk.addAmaticbToWallet();
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
    },
  }),
);
