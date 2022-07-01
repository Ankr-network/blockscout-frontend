import { IWeb3SendResult } from '@ankr.com/provider';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { getAnkrBalance } from 'modules/stake-ankr/actions/getAnkrBalance';
import { AnkrStakingSDK } from 'modules/stake-ankr/api/AnkrStakingSDK';

export const getTestAnkrTokens = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>
>(
  'test/getTestAnkrTokens',
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<IWeb3SendResult> => {
        const sdk = await AnkrStakingSDK.getInstance();
        return sdk.getTestAnkrTokens();
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onSuccess: (response, _action, { dispatchRequest }) => {
        dispatchRequest(getAnkrBalance());

        return response;
      },
    },
  }),
);
