import { t } from '@ankr.com/common';
import { RequestAction } from '@redux-requests/core';
import retry from 'async-retry';
import { createAction } from 'redux-smart-actions';

import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

import { SwitcherSDK } from '../api/SwitcherSDK';
import { IFetchTxData, IFetchTxReceiptData } from '../api/types';
import { AvailableSwitcherToken, AvailableSwitchNetwork } from '../const';

interface IGetTxDataArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
  txHash: string;
}

export const getTxData = createAction<
  RequestAction<IFetchTxData, IFetchTxData>
>('switcher/getTxData', ({ chainId, txHash, token }: IGetTxDataArgs) => ({
  request: {
    promise: (async (): Promise<IFetchTxData | undefined> => {
      const sdk = await SwitcherSDK.getInstance();

      return retry(async () => sdk.fetchTxData({ chainId, txHash, token }), {
        retries: RETRIES_TO_GET_TX_DATA,
      });
    })(),
  },
  meta: {
    showNotificationOnError: true,
    additionalErrorText: t('switcher.errors.tx-data'),
  },
}));

interface IGetTxReceiptArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
  txHash: string;
}

const POLL_INTERVAL_SECONDS = 5;

export const getTxReceipt = createAction<
  RequestAction<IFetchTxReceiptData, IFetchTxReceiptData>
>('switcher/getTxReceipt', ({ chainId, txHash, token }: IGetTxReceiptArgs) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    showNotificationOnError: true,
    additionalErrorText: t('switcher.errors.tx-receipt'),
    poll: POLL_INTERVAL_SECONDS,
    onRequest: request => {
      request.promise = SwitcherSDK.getInstance().then(sdk =>
        sdk.fetchTxReceipt({ chainId, txHash, token }),
      );

      return request;
    },
  },
}));
