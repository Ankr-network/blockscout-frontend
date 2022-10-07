import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { BinanceSDK } from '@ankr.com/staking-sdk';

interface ICheckPartnerCodeArgs {
  partnerCode: string;
}

export const checkExistPartnerCode = createAction<
  RequestAction<boolean, boolean>,
  [ICheckPartnerCodeArgs]
>(
  'bnb/checkExistPartnerCode',
  ({ partnerCode }): RequestAction => ({
    request: {
      promise: (async (): Promise<boolean> => {
        const sdk: BinanceSDK = await BinanceSDK.getInstance();

        return sdk.checkExistPartnerCode(partnerCode);
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
    },
  }),
);
