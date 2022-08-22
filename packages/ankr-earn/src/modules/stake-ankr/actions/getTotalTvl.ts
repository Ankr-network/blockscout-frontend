import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const getTotalTvl = createAction<RequestAction<BigNumber, BigNumber>>(
  `${ANKR_ACTIONS_PREFIX}getTotalTvl`,
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.getTotalTVL();
      })(),
    },
    meta: {
      showNotificationOnError: false,
    },
  }),
);
