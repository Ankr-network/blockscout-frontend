import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { SwitcherSDK } from '../api/SwitcherSDK';
import { IFetchTxData, IFetchTxReceiptData } from '../api/types';
import { AvailableSwitchNetwork } from '../const';

interface IGetTxDataArgs {
  chainId: AvailableSwitchNetwork;
  txHash: string;
}

export const getTxData = createAction<
  RequestAction<IFetchTxData, IFetchTxData>
>('switcher/getTxData', ({ chainId, txHash }: IGetTxDataArgs) => ({
  request: {
    promise: async (): Promise<IFetchTxData | undefined> => {
      const sdk = await SwitcherSDK.getInstance();

      return sdk.fetchTxData({ chainId, txHash });
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));

interface IGetTxReceiptArgs {
  chainId: AvailableSwitchNetwork;
  txHash: string;
}

const POLL_INTERVAL_SECONDS = 5;

export const getTxReceipt = createAction<
  RequestAction<IFetchTxReceiptData, IFetchTxReceiptData>
>('switcher/getTxReceipt', ({ chainId, txHash }: IGetTxReceiptArgs) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    poll: POLL_INTERVAL_SECONDS,
    getData: data => data,
    onRequest: request => {
      request.promise = SwitcherSDK.getInstance().then(sdk =>
        sdk.fetchTxReceipt({ chainId, txHash }),
      );

      return request;
    },
  },
}));
