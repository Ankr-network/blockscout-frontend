import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-eth';

import { withStore } from 'modules/common/utils/withStore';

import { PolygonSDK } from '../api/PolygonSDK';

export interface IGetTXData {
  amount: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export const getTxData = createAction<RequestAction<IGetTXData, IGetTXData>>(
  'polygon/getTxData',
  ({ txHash }: { txHash: string }) => ({
    request: {
      promise: async (): Promise<IGetTXData> => {
        const sdk = await PolygonSDK.getInstance();

        return sdk.fetchTxData(txHash);
      },
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      onRequest: withStore,
    },
  }),
);

const POLL_INTERVAL_SECONDS = 3;

export const getTxReceipt = createAction<
  RequestAction<TransactionReceipt, TransactionReceipt>
>('polygon/getTxReceipt', ({ txHash }: { txHash: string }) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    poll: POLL_INTERVAL_SECONDS,
    getData: data => data,
    onRequest: request => {
      request.promise = PolygonSDK.getInstance().then(sdk =>
        sdk.fetchTxReceipt(txHash),
      );

      return request;
    },
  },
}));
