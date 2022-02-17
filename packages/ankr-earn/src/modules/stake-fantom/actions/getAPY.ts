import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { getAftmbAPY } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

export const getAPY = createSmartAction<RequestAction<BigNumber, BigNumber>>(
  `${ACTIONS_PREFIX}getAPY`,
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        return getAftmbAPY();
      })(),
    },
    meta: {
      cache: 600, //seconds
      asMutation: false,
      getData: (data: BigNumber): BigNumber => data.multipliedBy(100),
    },
  }),
);
