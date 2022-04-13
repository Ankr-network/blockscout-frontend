import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AvalancheSDK } from '../api/AvalancheSDK';

export const addAVAXTokenToWallet = createAction<RequestAction<void, void>>(
  'avax/addAVAXTokenToWallet',
  () => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk = await AvalancheSDK.getInstance();

        return sdk.addAAVAXBToWallet();
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
    },
  }),
);
