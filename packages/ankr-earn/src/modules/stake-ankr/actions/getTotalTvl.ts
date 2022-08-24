import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingReadSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const getTotalTvl = createAction<RequestAction<BigNumber, BigNumber>>(
  `${ANKR_ACTIONS_PREFIX}getTotalTvl`,
  () => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await AnkrStakingReadSDK.getInstance();
        const provider = await sdk.getProvider();
        const latestBlockNumber = await provider.getBlockNumber();

        return sdk.getTotalTVL(latestBlockNumber);
      })(),
    },
    meta: {
      showNotificationOnError: false,
    },
  }),
);
