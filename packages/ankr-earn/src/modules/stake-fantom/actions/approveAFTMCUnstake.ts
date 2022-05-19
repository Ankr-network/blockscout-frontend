import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult } from 'provider';

import { ETH_SCALE_FACTOR } from 'modules/common/const';

import { FantomSDK } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

export const approveAFTMCUnstake = createAction<
  RequestAction<BigNumber, BigNumber>,
  [BigNumber]
>(`${ACTIONS_PREFIX}approveAFTMCUnstake`, amount => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult | undefined> => {
      const sdk = await FantomSDK.getInstance();

      return sdk.approveACForAB(amount, ETH_SCALE_FACTOR);
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
