import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult } from 'provider';

import { BinanceSDK } from '../api/BinanceSDK';

export const approveABNBCUnstake = createAction<
  RequestAction<BigNumber, BigNumber>,
  [BigNumber]
>(`bnb/approveABNBCUnstake`, amount => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult | undefined> => {
      const sdk = await BinanceSDK.getInstance();

      return sdk.approveABNBCUnstake(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    getData: data => data,
    onSuccess: async response => {
      const result = await response.data?.receiptPromise;

      response.data = response.data ? Boolean(result) : true;

      return response;
    },
  },
}));
