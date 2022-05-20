import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AvalancheSDK } from '../api/AvalancheSDK';

export const getStakeGasFee = createAction<RequestAction<BigNumber, BigNumber>>(
  `avax/getStakeGasFee`,
  (amount: BigNumber) => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await AvalancheSDK.getInstance();

        return sdk.getStakeGasFee(amount);
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
    },
  }),
);
