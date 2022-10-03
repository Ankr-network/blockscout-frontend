import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IWeb3SendResult } from '@ankr.com/provider';
import { BinanceSDK } from '@ankr.com/staking-sdk';

import { REFERRALS_ACTIONS_PREFIX } from '../api/const';

export const claimBNBRewards = createSmartAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>
>(`${REFERRALS_ACTIONS_PREFIX}claimBNBRewards`, () => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult> => {
      const sdk: BinanceSDK = await BinanceSDK.getInstance();

      return sdk.claimPartnerRewards();
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
  },
}));
