import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { PolygonSDK } from '../api/PolygonSDK';

export const fetchAPY = createSmartAction<RequestAction<BigNumber, BigNumber>>(
  'polygon/fetchAPY',
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await PolygonSDK.getInstance();

        return sdk.getAMATICBAPY();
      })(),
    },
    meta: {
      cache: 600,
      asMutation: false,
      getData: (data: BigNumber): BigNumber => data.multipliedBy(100),
    },
  }),
);
