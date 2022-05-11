import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { PolygonSDK } from '../api/PolygonSDK';

export const approveAMATICCUnstake = createAction<
  RequestAction<BigNumber, BigNumber>,
  [BigNumber]
>('polygon/approveAMATICCUnstake', amount => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await PolygonSDK.getInstance();

      return !!sdk.approveACForAB(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
