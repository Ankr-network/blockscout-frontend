import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MaticPolygonSDK } from '@ankr.com/staking-sdk';

import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';

export const addMATICTokenToWallet = createSmartAction<
  RequestAction<boolean, boolean>,
  [TMaticSyntToken]
>(`${MATIC_POLYGON_ACTIONS_PREFIX}addMATICTokenToWallet`, token => ({
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
