import { RequestAction, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { SupportedChainIDS } from 'modules/common/const';

import { BridgeSDK } from '../api/BridgeSDK';
import { AvailableBridgeTokens } from '../types';
import { getTokenAddr } from '../utils/getTokenAddr';

import {
  getTxReceipt,
  getTxReceiptRequestKey,
  IGetTxReceipt,
} from './getTxReceipt';

export interface IDepositArgs {
  amount: BigNumber;
  token: AvailableBridgeTokens;
  fromChainId: SupportedChainIDS;
  toChainId: SupportedChainIDS;
  onSuccess?: (response: { data: IGetTxReceipt | null }) => void;
}

export const deposit = createSmartAction<
  RequestAction<string, string>,
  [IDepositArgs]
>('bridge/deposit', ({ amount, token, fromChainId, toChainId, onSuccess }) => ({
  request: {
    promise: (async (): Promise<string> => {
      const sdk = await BridgeSDK.getInstance();
      const fromToken = getTokenAddr(token, fromChainId);

      return sdk.deposit(amount, fromToken, toChainId);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    onSuccess: (response: { data: string }, _action, store: RequestsStore) => {
      store.dispatch(
        getTxReceipt(response.data, {
          requestKey: getTxReceiptRequestKey(deposit.toString()),
          onSuccess,
        }),
      );

      return response;
    },
  },
}));
