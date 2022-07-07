import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { EthereumSDK, TEthToken } from '@ankr.com/staking-sdk';

import { ETH_ACTIONS_PREFIX } from '../const';

export const addTokenToWallet = createAction<
  RequestAction<boolean, boolean>,
  [TEthToken]
>(`${ETH_ACTIONS_PREFIX}/addTokenToWallet`, token => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await EthereumSDK.getInstance();
      return sdk.addTokenToWallet(token);
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
  },
}));
