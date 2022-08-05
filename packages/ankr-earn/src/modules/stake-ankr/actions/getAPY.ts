import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { DEFAULT_FIXED } from 'modules/common/const';

import { ANKR_ACTIONS_PREFIX } from '../const';

export const getAPY = createSmartAction<RequestAction<number, BigNumber>>(
  `${ANKR_ACTIONS_PREFIX}getAPY`,
  (): RequestAction => ({
    request: {
      promise: Promise.resolve(5.05),
    },
    meta: {
      showNotificationOnError: false,
      getData: data => new BigNumber(data).decimalPlaces(DEFAULT_FIXED),
    },
  }),
);
