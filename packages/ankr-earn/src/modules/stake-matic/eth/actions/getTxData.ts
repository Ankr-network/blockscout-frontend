import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-eth';

import { MaticEthSDK, IFetchTxData } from '@ankr.com/staking-sdk';

import { withStore } from 'modules/common/utils/withStore';

export const getTxData = createAction<
  RequestAction<IFetchTxData, IFetchTxData>
>('polygon/getTxData', ({ txHash }: { txHash: string }) => ({
  request: {
    promise: async (): Promise<IFetchTxData> => {
      const sdk = await MaticEthSDK.getInstance();

      return sdk.fetchTxData(txHash);
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));

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
    onRequest: request => {
      request.promise = MaticEthSDK.getInstance().then(sdk =>
        sdk.fetchTxReceipt(txHash),
      );

      return request;
    },
  },
}));
