import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { getBinanceSDK } from 'modules/stake-bnb/utils/getBinanceSDK';

import { REFERRALS_ACTIONS_PREFIX } from '../api/const';

export const getClaimableBNBRewards = createSmartAction<
  RequestAction<BigNumber, BigNumber>,
  [string]
>(`${REFERRALS_ACTIONS_PREFIX}getClaimableBNBRewards`, code => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await getBinanceSDK();

      return sdk.getPartnerClaimableRewards(code);
    })(),
  },
  meta: {
    showNotificationOnError: false,
  },
}));
