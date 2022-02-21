import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { getBurnFee as getBurnFeeFTM } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

export const getBurnFee = createAction<
  RequestAction<BigNumber, BigNumber>,
  [BigNumber]
>(`${ACTIONS_PREFIX}getBurnFee`, amount => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      return getBurnFeeFTM(amount);
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
  },
}));
