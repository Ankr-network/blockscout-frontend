import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

type TApprove = boolean;

export const approve = createAction<
  RequestAction<TApprove, TApprove>,
  [BigNumber]
>(`${ANKR_ACTIONS_PREFIX}approve`, amount => ({
  request: {
    promise: (async (): Promise<TApprove> => {
      const sdk = await AnkrStakingSDK.getInstance();

      return sdk.approve(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
