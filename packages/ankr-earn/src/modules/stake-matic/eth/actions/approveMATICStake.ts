import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MaticEthSDK } from '@ankr.com/staking-sdk';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';

export const approveMATICStake = createSmartAction<
  RequestAction<boolean, boolean>,
  [BigNumber]
>(`${MATIC_ETH_ACTIONS_PREFIX}approveMATICStake`, amount => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await MaticEthSDK.getInstance();

      return sdk.approveMATICToken(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
