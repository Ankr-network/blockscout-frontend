import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { BinanceSDK } from '../api/BinanceSDK';

export const getStakeGasFee = createAction<
  RequestAction<BigNumber, BigNumber>,
  [BigNumber]
>(`bnb/getStakeGasFee`, amount => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await BinanceSDK.getInstance();

      return sdk.getStakeGasFee(amount);
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
  },
}));
