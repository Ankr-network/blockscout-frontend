import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-core';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

export interface IGetTxData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
  provider: string;
}

interface IGetTxReceiptProps {
  txHash: string;
}

const POLL_INTERVAL_SECONDS = 3;

export const getTxReceipt = createAction<
  RequestAction<TransactionReceipt, TransactionReceipt>
>(`${ANKR_ACTIONS_PREFIX}getTxReceipt`, ({ txHash }: IGetTxReceiptProps) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    poll: POLL_INTERVAL_SECONDS,
    onRequest: request => {
      request.promise = AnkrStakingSDK.getInstance().then(sdk =>
        sdk.fetchTxReceipt(txHash),
      );

      return request;
    },
  },
}));
