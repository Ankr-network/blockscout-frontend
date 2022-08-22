import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-core';

import { IStakeData, MaticPolygonSDK } from '@ankr.com/staking-sdk';

import { Seconds } from 'modules/common/types';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';

type TData = TransactionReceipt | null;

const POLL_INTERVAL: Seconds = 3;

export const getTxReceipt = createSmartAction<
  RequestAction<TData, TData>,
  [IStakeData]
>(`${MATIC_POLYGON_ACTIONS_PREFIX}/getTxReceipt`, ({ txHash }) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    poll: POLL_INTERVAL,
    showNotificationOnError: true,
    onRequest: request => {
      request.promise = MaticPolygonSDK.getInstance().then(sdk =>
        sdk.getTxReceipt(txHash),
      );

      return request;
    },
  },
}));
