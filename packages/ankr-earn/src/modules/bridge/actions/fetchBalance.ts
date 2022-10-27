import { RequestAction } from '@redux-requests/core';
import retry from 'async-retry';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { BridgeSDK } from '../api/BridgeSDK';
import { AvailableBridgeTokens } from '../types';
import { getTokenAddr } from '../utils/getTokenAddr';

export interface IBridgeFetchBalanceArgs {
  token: AvailableBridgeTokens;
  network: number;
}

export const fetchBalance = createSmartAction<
  RequestAction<BigNumber, BigNumber>,
  [IBridgeFetchBalanceArgs]
>('bridge/fetchBalance', ({ token, network }) => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await BridgeSDK.getInstance();
      const tokenAddr = getTokenAddr(token, network);

      return retry(() => sdk.getBalance(tokenAddr), {
        retries: 1,
        minTimeout: 500,
      });
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
