import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';

export const addMATICTokenToWallet = createSmartAction<
  RequestAction<boolean, boolean>,
  [TMaticSyntToken]
>(`${MATIC_POLYGON_ACTIONS_PREFIX}addMATICTokenToWallet`, token => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await PolygonOnPolygonSDK.getInstance();
      const tokenSymbol = getTokenSymbol(token);

      return sdk.addTokenToWallet(tokenSymbol);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
  },
}));
