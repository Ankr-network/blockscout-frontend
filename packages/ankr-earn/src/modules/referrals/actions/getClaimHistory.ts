import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { BinanceSDK, IPartnerClaimHistoryData } from '@ankr.com/staking-sdk';

import { REFERRALS_ACTIONS_PREFIX } from '../api/const';

export const getClaimHistory = createSmartAction<
  RequestAction<IPartnerClaimHistoryData[], IPartnerClaimHistoryData[]>,
  [string]
>(`${REFERRALS_ACTIONS_PREFIX}getClaimHistory`, code => ({
  request: {
    promise: (async (): Promise<IPartnerClaimHistoryData[]> => {
      const sdk = await BinanceSDK.getInstance();

      return sdk.getPartnerClaimHistory(code);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
