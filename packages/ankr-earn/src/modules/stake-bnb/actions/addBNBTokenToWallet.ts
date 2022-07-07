import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';

import { TBnbSyntToken } from '../types';

export const addBNBTokenToWallet = createAction<
  RequestAction<boolean, boolean>,
  [TBnbSyntToken?]
>('bnb/addBNBTokenToWallet', (token = Token.aBNBb) => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await BinanceSDK.getInstance();

      return sdk.addTokenToWallet(token);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
  },
}));
