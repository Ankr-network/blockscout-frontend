import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

export const getProviderAddresses = createAction<
  RequestAction<string[], string[]>
>(`${MGNO_ACTIONS_PREFIX}getProviderAddresses`, () => ({
  request: {
    promise: (async (): Promise<string[]> => {
      const sdk = await GnosisStakingSDK.getInstance();

      return sdk.getAllProviderAddresses();
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
