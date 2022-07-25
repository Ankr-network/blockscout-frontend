import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { FantomSDK } from '@ankr.com/staking-sdk';

import { ACTIONS_PREFIX } from '../const';
import { TFtmSyntToken } from '../types/TFtmSyntToken';

export const getStakeGasFee = createAction<
  RequestAction<BigNumber, BigNumber>,
  [BigNumber, TFtmSyntToken]
>(`${ACTIONS_PREFIX}getStakeGasFee`, (amount, token) => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await FantomSDK.getInstance();

      return sdk.getStakeGasFee(amount, token);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    asMutation: false,
    getData: data => data,
  },
}));
