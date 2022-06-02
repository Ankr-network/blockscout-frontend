import {
  RequestAction,
  RequestsStore,
  stopPolling,
  RequestActionMeta,
} from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-core';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { Seconds } from 'modules/common/types';

const POLL_INTERVAL: Seconds = 5;

type TGetTxReceiptResponse = TransactionReceipt | null;

export interface IGetTxReceipt
  extends Pick<TransactionReceipt, 'status' | 'transactionHash'> {}

export const getTxReceipt = createAction<
  RequestAction<TGetTxReceiptResponse, IGetTxReceipt | null>,
  [string, RequestActionMeta<TGetTxReceiptResponse, IGetTxReceipt | null>?]
>(`getTxReceipt`, (txHash, meta) => ({
  request: {
    promise: Promise.resolve(null),
  },
  meta: {
    ...meta,
    showNotificationOnError: true,
    poll: POLL_INTERVAL,
    getData: data => {
      if (!data) {
        return null;
      }

      const updatedData: IGetTxReceipt = {
        status: data.status,
        transactionHash: data.transactionHash,
      };

      return updatedData;
    },
    onRequest: request => {
      const providerPromise =
        ProviderManagerSingleton.getInstance().getETHWriteProvider();

      const receiptPromise = providerPromise.then(async provider => {
        const web3 = provider.getWeb3();
        const receipt = await web3.eth.getTransactionReceipt(txHash);
        return receipt as TGetTxReceiptResponse;
      });

      request.promise = receiptPromise;

      return request;
    },
    onSuccess: (
      response: { data?: TGetTxReceiptResponse },
      action: RequestAction,
      store: RequestsStore,
    ) => {
      if (response.data) {
        const actionName = `${getTxReceipt.toString()}${
          meta?.requestKey ?? ''
        }`;

        store.dispatch(stopPolling([actionName]));

        if (typeof meta?.onSuccess === 'function') {
          meta.onSuccess(response, action, store);
        }
      }

      return response;
    },
  },
}));

export function getTxReceiptRequestKey(key?: string): string {
  return key ? `/${key}` : '';
}
