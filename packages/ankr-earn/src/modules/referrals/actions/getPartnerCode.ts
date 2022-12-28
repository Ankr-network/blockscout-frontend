import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { getBinanceSDK } from 'modules/stake-bnb/utils/getBinanceSDK';

import { REFERRALS_ACTIONS_PREFIX } from '../api/const';

export const getPartnerCode = createSmartAction<
  RequestAction<string, string>,
  [string]
>(`${REFERRALS_ACTIONS_PREFIX}getPartnerCode`, address => ({
  request: {
    promise: (async (): Promise<string> => {
      const sdk = await getBinanceSDK();

      return sdk.getPartnerCodeByAddress(address);
    })(),
  },
  meta: {
    showNotificationOnError: false,
  },
}));
