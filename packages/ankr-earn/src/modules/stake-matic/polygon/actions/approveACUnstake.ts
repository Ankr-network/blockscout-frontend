import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MaticPolygonSDK } from '@ankr.com/staking-sdk';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';

export const approveACUnstake = createSmartAction<
  RequestAction<boolean, boolean>,
  [BigNumber]
>(`${MATIC_POLYGON_ACTIONS_PREFIX}approveACUnstake`, amount => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await MaticPolygonSDK.getInstance();

      return sdk.approveACToken(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
