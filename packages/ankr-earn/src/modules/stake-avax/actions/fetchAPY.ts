import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';

interface IResData {
  apy?: string;
  timestamp?: number;
}

export const fetchAPY = createSmartAction<RequestAction<BigNumber, BigNumber>>(
  'avax/fetchAPY',
  (): RequestAction => ({
    request: {
      method: 'get',
      url: '/v1alpha/avax/estimatedapy',
    },
    meta: {
      showNotificationOnError: false,
      cache: ACTION_CACHE_SEC,
      driver: 'axios',
      getData: (data: IResData): BigNumber => {
        if (typeof data?.apy !== 'string' || data.apy.length < 2) {
          return ZERO;
        }

        const rawAPYVal = data.apy.slice(0, -1);

        return new BigNumber(rawAPYVal);
      },
    },
  }),
);
