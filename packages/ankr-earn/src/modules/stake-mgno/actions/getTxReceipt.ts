import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-core';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { MGNO_ACTIONS_PREFIX } from '../const';

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
>(`${MGNO_ACTIONS_PREFIX}getTxReceipt`, ({ txHash }: IGetTxReceiptProps) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    poll: POLL_INTERVAL_SECONDS,
    takeLatest: true,
    onRequest: request => {
      request.promise = GnosisStakingSDK.getInstance().then(sdk =>
        sdk.fetchTxReceipt(txHash),
      );

      return request;
    },
  },
}));
