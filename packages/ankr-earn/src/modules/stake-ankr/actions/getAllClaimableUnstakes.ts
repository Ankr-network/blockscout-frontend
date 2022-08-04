import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IClaimableUnstake } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const getAllClaimableUnstakes = createAction<
  RequestAction<IClaimableUnstake[], IClaimableUnstake[]>
>(`${ANKR_ACTIONS_PREFIX}getAllClaimableUnstakes`, () => ({
  request: {
    promise: (async (): Promise<IClaimableUnstake[]> => {
      const sdk = await AnkrStakingSDK.getInstance();

      return sdk.getAllClaimableUnstakes();
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
