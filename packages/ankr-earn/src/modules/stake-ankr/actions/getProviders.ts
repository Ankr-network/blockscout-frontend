import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { Seconds } from 'modules/common/types';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IValidator } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const ACTION_CACHE: Seconds = 2 * 60;

export const getProviders = createAction<
  RequestAction<IValidator[], IValidator[]>
>(`${ANKR_ACTIONS_PREFIX}getProviders`, () => ({
  request: {
    promise: (async (): Promise<IValidator[]> => {
      const sdk = await AnkrStakingSDK.getInstance();

      return sdk.getAllValidators();
    })(),
  },
  meta: {
    showNotificationOnError: true,
    cache: ACTION_CACHE,
  },
}));
