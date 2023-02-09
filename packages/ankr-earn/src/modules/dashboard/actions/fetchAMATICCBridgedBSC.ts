import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { BSC_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { withStore } from 'modules/common/utils/withStore';

import { DashboardSDK } from '../api/DashboardSDK';

export const fetchAMATICCBridgedBSC = createAction<
  RequestAction<unknown, BigNumber>
>('dashboard/fetchAMATICCBridgedBSC', () => ({
  request: {
    promise: async (): Promise<BigNumber> => {
      const sdk = await DashboardSDK.getInstance();

      return sdk.getBalance({
        token: Token.aMATICc,
        networkID: BSC_NETWORK_BY_ENV,
      });
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));