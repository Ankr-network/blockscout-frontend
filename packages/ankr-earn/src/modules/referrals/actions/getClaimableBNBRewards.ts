import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { REFERRALS_ACTIONS_PREFIX } from '../api/const';

export const getClaimableBNBRewards = createSmartAction<
  RequestAction<BigNumber, BigNumber>,
  [string]
>(`${REFERRALS_ACTIONS_PREFIX}getClaimableBNBRewards`, code => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await BinanceSDK.getInstance();

      return sdk.getPartnerClaimableRewards(code);
    })(),
  },
  meta: {
    showNotificationOnError: false,
  },
}));
