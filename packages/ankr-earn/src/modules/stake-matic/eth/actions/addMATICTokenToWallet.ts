import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';
import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';

export const addMATICTokenToWallet = createAction<
  RequestAction<void, void>,
  [TMaticSyntToken]
>(
  `${MATIC_ETH_ACTIONS_PREFIX}addMATICTokenToWallet`,
  (token = Token.aMATICb) => ({
    request: {
      promise: (async (): Promise<boolean> => {
        const sdk = await PolygonOnEthereumSDK.getInstance();
        const tokenSymbol = getTokenSymbol(token);

        return sdk.addTokenToWallet(tokenSymbol);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
    },
  }),
);
