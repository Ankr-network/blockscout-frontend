import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { BinanceSDK } from '../api/BinanceSDK';

export const fetchAPY = createSmartAction<RequestAction<BigNumber, BigNumber>>(
  'bnb/fetchAPY',
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk: BinanceSDK = await BinanceSDK.getInstance();
        return sdk.getaBNBbAPY();
      })(),
    },
    meta: {
      asMutation: false,
      getData: (data: BigNumber): BigNumber => data,
    },
  }),
);
