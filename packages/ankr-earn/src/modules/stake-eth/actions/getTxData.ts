import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-core';

import { EthSDK } from 'modules/api/EthSDK';
import { withStore } from 'modules/common/utils/withStore';

import { ETH_ACTIONS_PREFIX } from '../const';

export interface IGetSwitcherData {
  amount: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export const getTxData = createAction<
  RequestAction<IGetSwitcherData, IGetSwitcherData>
>(`${ETH_ACTIONS_PREFIX}getTxData`, ({ txHash }: { txHash: string }) => ({
  request: {
    promise: async (): Promise<IGetSwitcherData> => {
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
      request.promise = EthSDK.getInstance().then(sdk =>
        sdk.fetchTxReceipt(txHash),
      );

      return request;
    },
  },
}));
