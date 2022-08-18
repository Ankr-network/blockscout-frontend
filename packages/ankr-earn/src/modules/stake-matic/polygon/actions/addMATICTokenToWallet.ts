import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MaticPolygonSDK } from '@ankr.com/staking-sdk';

import { TMaticSyntToken } from 'modules/stake-matic/common/types';

export const addMATICTokenToWallet = createSmartAction<
  RequestAction<boolean, boolean>,
  [TMaticSyntToken]
>('matic/polygon/addMATICTokenToWallet', token => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await MaticPolygonSDK.getInstance();

      return sdk.addTokenToWallet(token);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
  },
}));
