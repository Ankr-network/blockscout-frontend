import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-core';

import { withStore } from 'modules/common/utils/withStore';

import { EthSDK } from '../api/sdk';

export interface IGetEth2SwapData {
  amount: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export const getTxData = createAction<
  RequestAction<IGetEth2SwapData, IGetEth2SwapData>
>('eth2-swap/getTxData', ({ txHash }: { txHash: string }) => ({
  request: {
    promise: async (): Promise<IGetEth2SwapData> => {
      const sdk = await EthSDK.getInstance();

      return sdk.fetchTxData(txHash);
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));

const POLL_INTERVAL_SECONDS = 5;

export const getTxReceipt = createAction<
  RequestAction<TransactionReceipt, TransactionReceipt>
>('eth2-swap/getTxReceipt', ({ txHash }: { txHash: string }) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    poll: POLL_INTERVAL_SECONDS,
    getData: data => data,
    onRequest: request => {
      request.promise = EthSDK.getInstance().then(sdk =>
        sdk.fetchTxReceipt(txHash),
      );

      return request;
    },
  },
}));
