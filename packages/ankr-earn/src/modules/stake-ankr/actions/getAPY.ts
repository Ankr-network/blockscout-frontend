import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IApyData } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const getAPY = createSmartAction<RequestAction<IApyData[], IApyData[]>>(
  `${ANKR_ACTIONS_PREFIX}getAPY`,
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<IApyData[]> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.getAPY();
      })(),
    },
    meta: {
      showNotificationOnError: false,
    },
  }),
);
