import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';

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
