import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ETH_SCALE_FACTOR } from 'modules/common/const';

import { PolygonSDK } from '../api/PolygonSDK';

export const approveAMATICCUnstake = createAction<
  RequestAction<BigNumber, BigNumber>,
  [BigNumber]
>('polygon/approveAMATICCUnstake', amount => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await PolygonSDK.getInstance();

      return !!sdk.approveACForAB(amount, ETH_SCALE_FACTOR);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
