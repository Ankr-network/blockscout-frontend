import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { POLYGON_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { DashboardSDK } from '../api/DashboardSDK';

export const fetchAMATICBBridged = createAction<
  RequestAction<unknown, BigNumber>
>('dashboard/fetchAMATICBBridged', () => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await DashboardSDK.getInstance();

      return sdk.getBalance({
        token: Token.aMATICb,
        networkID: POLYGON_NETWORK_BY_ENV,
      });
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
