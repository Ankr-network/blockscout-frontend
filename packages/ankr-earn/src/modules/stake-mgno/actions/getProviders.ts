import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { IProvider } from '../api/GnosisStakingSDK/types';
import { MGNO_ACTIONS_PREFIX } from '../const';

export const getProviders = createAction<
  RequestAction<IProvider[], IProvider[]>
>(`${MGNO_ACTIONS_PREFIX}getProviders`, () => ({
  request: {
    promise: (async (): Promise<IProvider[]> => {
      const sdk = await GnosisStakingSDK.getInstance();

      return sdk.getAllProviders();
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
