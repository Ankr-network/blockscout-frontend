import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ACTION_CACHE_SEC } from 'modules/common/const';

// import { getAftmbAPY } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

// todo: remove when actual APY will be calculated
const HARDCODED_APY = 0.093;

export const getAPY = createSmartAction<RequestAction<BigNumber, BigNumber>>(
  `${ACTIONS_PREFIX}getAPY`,
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        // return getAftmbAPY();
        return new BigNumber(HARDCODED_APY);
      })(),
    },
    meta: {
      cache: ACTION_CACHE_SEC,
      asMutation: false,
      getData: (data: BigNumber): BigNumber => data.multipliedBy(100),
    },
  }),
);
