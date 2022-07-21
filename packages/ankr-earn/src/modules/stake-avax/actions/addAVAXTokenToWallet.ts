import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AvalancheSDK } from '@ankr.com/staking-sdk';

import { TAvaxSyntToken } from '../types';

export const addAVAXTokenToWallet = createAction<
  RequestAction<void, void>,
  [TAvaxSyntToken]
>('avax/addAVAXTokenToWallet', (token: TAvaxSyntToken) => ({
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
}));
