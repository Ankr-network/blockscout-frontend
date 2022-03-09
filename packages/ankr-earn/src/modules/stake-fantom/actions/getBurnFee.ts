import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { FantomSDK } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

export const getBurnFee = createAction<
  RequestAction<BigNumber, BigNumber>,
  [BigNumber]
>(`${ACTIONS_PREFIX}getBurnFee`, amount => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await FantomSDK.getInstance();

      return sdk.getBurnFee(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    asMutation: false,
    getData: data => data,
  },
}));
