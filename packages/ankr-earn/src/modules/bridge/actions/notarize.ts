import { RequestAction } from '@redux-requests/core';
import retry, { Options } from 'async-retry';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { SupportedChainIDS } from 'modules/common/const';

import { BridgeSDK } from '../api/BridgeSDK';
import { IBridgeNotarizeResponse } from '../api/types/types';

export const notarize = createSmartAction<
  RequestAction<IBridgeNotarizeResponse, IBridgeNotarizeResponse>
>(
  'bridge/notarize',
  (transactionHash: string, chainIdFrom: SupportedChainIDS) => ({
    request: {
      promise: (async (): Promise<IBridgeNotarizeResponse> => {
        const sdk = await BridgeSDK.getInstance();

        const retryParams: Options = {
          retries: 30,
          factor: 1,
          minTimeout: 10000,
        };

        const response = await retry(
          async () => sdk.notarize(transactionHash, chainIdFrom),
          retryParams,
        );

        return response.data;
      })(),
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
