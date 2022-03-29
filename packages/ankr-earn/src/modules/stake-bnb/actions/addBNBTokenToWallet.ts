import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { Token } from 'modules/common/types/token';

import { BinanceSDK } from '../api/BinanceSDK';
import { TBnbSyntToken } from '../types';

export const addBNBTokenToWallet = createAction<
  RequestAction<void, void>,
  [TBnbSyntToken?]
>('bnb/addBNBTokenToWallet', (token = Token.aBNBb) => ({
  request: {
    promise: (async (): Promise<void> => {
      const sdk = await BinanceSDK.getInstance();

      return sdk.addTokenToWallet(token);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
  },
}));
