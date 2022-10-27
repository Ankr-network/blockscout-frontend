import { IWeb3SendResult } from '@ankr.com/provider-core';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from 'modules/stake-ankr/api/AnkrStakingSDK';

// TODO Likelly bind to the current address: add providerTags argument
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
      onSuccess: response => {
        return response;
      },
    },
  }),
);
