import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { MaticEthSDK } from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

export const addMATICTokenToWallet = createAction<
  RequestAction<void, void>,
  [TMaticSyntToken]
>('polygon/addMATICTokenToWallet', (token = Token.aMATICb) => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await MaticEthSDK.getInstance();

      return sdk.addTokenToWallet(token);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
  },
}));
