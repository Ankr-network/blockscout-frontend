import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { PolygonSDK } from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';

import { TMaticSyntToken } from '../types';

export const addMATICTokenToWallet = createAction<
  RequestAction<void, void>,
  [TMaticSyntToken]
>('polygon/addMATICTokenToWallet', (token = Token.aMATICb) => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await PolygonSDK.getInstance();

      return sdk.addTokenToWallet(token);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
  },
}));
