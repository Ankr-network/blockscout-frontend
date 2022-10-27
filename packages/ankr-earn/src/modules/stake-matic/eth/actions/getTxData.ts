import { RequestAction } from '@redux-requests/core';
import retry from 'async-retry';
import { createAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-eth';

import { IFetchTxData, PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';
import { withStore } from 'modules/common/utils/withStore';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';

export const getTxData = createAction<
  RequestAction<IFetchTxData, IFetchTxData>
>(`${MATIC_ETH_ACTIONS_PREFIX}getTxData`, ({ txHash }: { txHash: string }) => ({
  request: {
    promise: async (): Promise<IFetchTxData> => {
      const sdk = await PolygonOnEthereumSDK.getInstance();

      return retry(() => sdk.fetchTxData(txHash), {
        retries: RETRIES_TO_GET_TX_DATA,
      });
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
>(
  `${MATIC_ETH_ACTIONS_PREFIX}getTxReceipt`,
  ({ txHash }: { txHash: string }) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      poll: POLL_INTERVAL_SECONDS,
      onRequest: request => {
        request.promise = PolygonOnEthereumSDK.getInstance().then(sdk =>
          sdk.fetchTxReceipt(txHash),
        );

        return request;
      },
    },
  }),
);
