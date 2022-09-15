import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';

import { getBalance } from './getBalance';

export const getTestMgnoTokens = createAction<RequestAction<string, string>>(
  'test/getTestMgnoTokens',
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<string> => {
        const sdk = await GnosisStakingSDK.getInstance();
        return sdk.mintMgno();
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onSuccess: (response, _action, { dispatchRequest }) => {
        dispatchRequest(getBalance());

        return response;
      },
    },
  }),
);
