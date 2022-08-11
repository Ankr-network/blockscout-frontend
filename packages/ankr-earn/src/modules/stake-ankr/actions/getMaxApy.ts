import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ANKR_ACTIONS_PREFIX, TEMPORARY_APY } from '../const';

export const getMaxApy = createSmartAction<RequestAction<BigNumber, BigNumber>>(
  `${ANKR_ACTIONS_PREFIX}getMaxApy`,
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        return TEMPORARY_APY;
      })(),
    },
    meta: {
      showNotificationOnError: false,
    },
  }),
);
