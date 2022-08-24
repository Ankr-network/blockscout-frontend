import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';

import { BridgeSDK } from '../api/BridgeSDK';

export const withdrawal = createAction<RequestAction<string, string>>(
  'bridge/withdrawal',
  (proof: string, receipt: string, signature: string) => ({
    request: {
      promise: (async (): Promise<string> => {
        const sdk = await BridgeSDK.getInstance();

        const transactionHash = await sdk.withdraw(proof, receipt, signature);

        return transactionHash;
      })(),
    },
    meta: {
      showNotificationOnError: true,
      onSuccess: (
        response: { data: string },
        _action,
        store: RequestsStore,
      ) => {
        store.dispatch(
          getTxReceipt(response.data, {
            requestKey: getTxReceiptRequestKey(withdrawal.toString()),
          }),
        );

        return response;
      },
    },
  }),
);
