import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

type TApprove = boolean;

export const approve = createAction<
  RequestAction<TApprove, TApprove>,
  [BigNumber]
>(`${MGNO_ACTIONS_PREFIX}approve`, amount => ({
  request: {
    promise: (async (): Promise<TApprove> => {
      const sdk = await GnosisStakingSDK.getInstance();

      return sdk.approve(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
