import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ACTION_CACHE_SEC } from 'modules/common/const';

import { PolygonSDK } from '../api/PolygonSDK';

export const fetchAPY = createSmartAction<RequestAction<BigNumber, BigNumber>>(
  'polygon/fetchAPY',
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await PolygonSDK.getInstance();

        return sdk.getAMaticbAPY();
      })(),
    },
    meta: {
      asMutation: false,
      cache: ACTION_CACHE_SEC,
      getData: (data: BigNumber): BigNumber => data.multipliedBy(100),
    },
  }),
);
