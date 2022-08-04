import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { DEFAULT_FIXED, isMainnet, ZERO } from 'modules/common/const';

import { ANKR_ACTIONS_PREFIX, ANKR_TOKEN_STAKING_APY } from '../const';

export const getAPY = createSmartAction<RequestAction<number, BigNumber>>(
  `${ANKR_ACTIONS_PREFIX}getAPY`,
  (): RequestAction => ({
    request: !isMainnet
      ? { url: ANKR_TOKEN_STAKING_APY }
      : {
          promise: Promise.resolve(ZERO),
        },
    meta: {
      driver: 'axios',
      showNotificationOnError: false,
      getData: data => new BigNumber(data).decimalPlaces(DEFAULT_FIXED),
    },
  }),
);
