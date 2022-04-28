import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { EthSDK, TEthToken } from 'modules/api/EthSDK';

import { ETH_ACTIONS_PREFIX } from '../const';

export const addTokenToWallet = createAction<
  RequestAction<boolean, boolean>,
  [TEthToken]
>(`${ETH_ACTIONS_PREFIX}/addTokenToWallet`, token => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await EthSDK.getInstance();
      return sdk.addTokenToWallet(token);
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
  },
}));
