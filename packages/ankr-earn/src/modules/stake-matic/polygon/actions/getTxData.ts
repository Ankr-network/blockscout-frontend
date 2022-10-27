import { RequestAction } from '@redux-requests/core';
import retry from 'async-retry';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-eth';

import { IStakeData, PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';
import { withStore } from 'modules/common/utils/withStore';
import { IFetchTxData } from 'modules/switcher/api/types';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';

export const getTxData = createSmartAction<
  RequestAction<IFetchTxData, IFetchTxData>,
  [IStakeData]
>(`${MATIC_POLYGON_ACTIONS_PREFIX}getTxData`, ({ txHash }) => ({
  request: {
    promise: async (): Promise<IFetchTxData> => {
      const sdk = await PolygonOnPolygonSDK.getInstance();

      return retry(() => sdk.getTxData(txHash), {
        retries: RETRIES_TO_GET_TX_DATA,
      });
    },
  },
  meta: {
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));

const POLL_INTERVAL_SECONDS = 3;

export const getTxReceipt = createSmartAction<
  RequestAction<TransactionReceipt, TransactionReceipt>
>(
  `${MATIC_POLYGON_ACTIONS_PREFIX}getTxReceipt`,
  ({ txHash }: { txHash: string }) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      poll: POLL_INTERVAL_SECONDS,
      onRequest: request => {
        request.promise = PolygonOnPolygonSDK.getInstance().then(sdk =>
          sdk.getTxReceipt(txHash),
        );

        return request;
      },
    },
  }),
);
