import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { MaticEthSDK } from '@ankr.com/staking-sdk';

import { ETH_SCALE_FACTOR } from 'modules/common/const';
import { withStore } from 'modules/common/utils/withStore';

import { getAllowance } from './getAllowance';

export const approveAMATICCUnstake = createAction<
  RequestAction<boolean, boolean>,
  [BigNumber]
>('polygon/approveAMATICCUnstake', amount => ({
  request: {
    promise: async (store: RequestsStore): Promise<boolean> => {
      const { data: allowance } = getQuery<BigNumber | null>(store.getState(), {
        type: getAllowance.toString(),
      });

      if (allowance && allowance.isGreaterThanOrEqualTo(amount)) {
        return true;
      }

      const sdk = await MaticEthSDK.getInstance();

      const result = await sdk.approveACForAB(amount, ETH_SCALE_FACTOR);

      await result?.receiptPromise;

      return !!result;
    },
  },
  meta: {
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));
