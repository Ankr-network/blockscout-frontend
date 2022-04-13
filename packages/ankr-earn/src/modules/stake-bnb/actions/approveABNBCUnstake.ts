import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { BinanceSDK } from '../api/BinanceSDK';

export const approveABNBCUnstake = createAction<
  RequestAction<BigNumber, BigNumber>,
  [BigNumber]
>(`bnb/approveABNBCUnstake`, amount => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await BinanceSDK.getInstance();

      return sdk.approveABNBCUnstake(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    getData: data => data,
  },
}));
