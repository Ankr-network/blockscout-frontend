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
      const provider = await sdk.getProvider();

      return sdk.getAllClaimableUnstakes(await provider.getBlockNumber());
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
