import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';
import { getBinanceSDK } from 'modules/stake-bnb/utils/getBinanceSDK';

export const fetchAETHCBridgeBalanceBSC = createAction<
  RequestAction<unknown, BigNumber>
>('dashboard/fetchAETHCBridgeBalanceBSC', () => ({
  request: {
    promise: async (): Promise<BigNumber> => {
      const sdk = await getBinanceSDK();

      return sdk.getAvailableToSwapAETHC();
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));
