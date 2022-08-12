import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { MaticEthSDK } from '@ankr.com/staking-sdk';

import { ETH_SCALE_FACTOR } from 'modules/common/const';

export const approveAMATICCUnstake = createAction<
  RequestAction<BigNumber, BigNumber>,
  [BigNumber]
>('polygon/approveAMATICCUnstake', amount => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await MaticEthSDK.getInstance();

      return !!sdk.approveACForAB(amount, ETH_SCALE_FACTOR);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
