import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { REFERRALS_ACTIONS_PREFIX } from '../api/const';

export const getPartnerCode = createSmartAction<
  RequestAction<string, string>,
  [string]
>(`${REFERRALS_ACTIONS_PREFIX}getPartnerCode`, address => ({
  request: {
    promise: (async (): Promise<string> => {
      const sdk = await BinanceSDK.getInstance();

      return sdk.getPartnerCodeByAddress(address);
    })(),
  },
  meta: {
    showNotificationOnError: false,
  },
}));
