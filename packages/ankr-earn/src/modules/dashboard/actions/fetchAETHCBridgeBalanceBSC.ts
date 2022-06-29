import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { withStore } from 'modules/common/utils/withStore';

export const fetchAETHCBridgeBalanceBSC = createAction<
  RequestAction<unknown, BigNumber>
>('dashboard/fetchAETHCBridgeBalanceBSC', () => ({
  request: {
    promise: async (): Promise<BigNumber> => {
      const sdk = await BinanceSDK.getInstance();

      return sdk.getAvailableToSwapAETHC();
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));
