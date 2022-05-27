import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { SlotAuctionSdk } from 'polkadot';

import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';

export const depositFundsToCrowdloan = createAction(
  'DEPOSIT_FUNDS_TO_CROWDLOAN',
  (polkadotAccount: string, loanId: number, value: string): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {
        const slotAuctionSdk: SlotAuctionSdk =
          await SlotAuctionSdkSingleton.getInstance();

        return slotAuctionSdk.depositFundsToCrowdloan(
          polkadotAccount,
          loanId,
          new BigNumber(value),
        );
      })(),
    },
    meta: {
      showNotificationOnError: true,
      asMutation: true,
    },
  }),
);
