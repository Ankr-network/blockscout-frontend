import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { ETH_SCALE_FACTOR } from 'modules/common/const';

export const approveABNBCForSwapPool = createAction<
  RequestAction<boolean, boolean>,
  [BigNumber]
>(`bnb/approveABNBCUnstake`, amount => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await BinanceSDK.getInstance();

      return sdk.approveACTokenForSwapPool(amount, ETH_SCALE_FACTOR);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
