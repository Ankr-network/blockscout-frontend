import { RequestAction } from '@redux-requests/core';
import retry from 'async-retry';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-core';

import { EthereumSDK } from '@ankr.com/staking-sdk';

import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';
import { withStore } from 'modules/common/utils/withStore';

import { ETH_ACTIONS_PREFIX } from '../const';

export interface IGetSwitcherData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

interface IGetTxDataArgs {
  txHash: string;
  shouldDecodeAmount?: boolean;
}

export const getTxData = createAction<
  RequestAction<IGetSwitcherData, IGetSwitcherData>,
  [IGetTxDataArgs]
>(`${ETH_ACTIONS_PREFIX}getTxData`, ({ txHash, shouldDecodeAmount }) => ({
  request: {
    promise: async (): Promise<IGetSwitcherData> => {
      const sdk = await EthereumSDK.getInstance();

      return retry(() => sdk.fetchTxData(txHash, shouldDecodeAmount), {
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

const POLL_INTERVAL_SECONDS = 5;

export const getTxReceipt = createAction<
  RequestAction<TransactionReceipt, TransactionReceipt>
>(`${ETH_ACTIONS_PREFIX}getTxReceipt`, ({ txHash }: { txHash: string }) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    poll: POLL_INTERVAL_SECONDS,
    getData: data => data,
    onRequest: request => {
      request.promise = EthereumSDK.getInstance().then(sdk =>
        sdk.fetchTxReceipt(txHash),
      );

      return request;
    },
  },
}));
