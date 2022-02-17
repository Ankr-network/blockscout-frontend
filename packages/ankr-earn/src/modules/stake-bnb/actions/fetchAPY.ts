import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { BinanceSDK } from '../api/BinanceSDK';

export const fetchAPY = createSmartAction<RequestAction<BigNumber, BigNumber>>(
  'bnb/fetchAPY',
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await BinanceSDK.getInstance();

        return sdk.getABNBBAPY();
      })(),
    },
    meta: {
      asMutation: false,
      getData: (data: BigNumber): BigNumber => data.multipliedBy(100),
    },
  }),
);
