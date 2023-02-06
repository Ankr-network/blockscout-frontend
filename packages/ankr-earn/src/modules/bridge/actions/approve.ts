import { t } from '@ankr.com/common';
import { RequestAction, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';
import { SupportedChainIDS } from 'modules/common/const';

import { BridgeSDK } from '../api/BridgeSDK';
import { IBridgeApproveResponse } from '../api/types/types';
import { AvailableBridgeTokens } from '../types';
import { getTokenAddr } from '../utils/getTokenAddr';

export const approve = createAction<
  RequestAction<IBridgeApproveResponse, IBridgeApproveResponse>,
  [BigNumber, AvailableBridgeTokens, SupportedChainIDS]
>('bridge/approve', (amount, token, fromChainId) => ({
  request: {
    promise: (async (): Promise<IBridgeApproveResponse> => {
      const sdk = await BridgeSDK.getInstance();
      const tokenAddr = getTokenAddr(token, fromChainId);

      return sdk.approve(amount, tokenAddr);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    additionalErrorText: t('bridge.errors.approve'),
    onSuccess: (
      response: { data: IBridgeApproveResponse },
      _action,
      store: RequestsStore,
    ) => {
      const { txHash } = response.data;
      const isNotApprovedYet = typeof txHash === 'string';

      if (isNotApprovedYet) {
        store.dispatch(
          getTxReceipt(txHash, {
            requestKey: getTxReceiptRequestKey(approve.toString()),
          }),
        );
      }

      return response;
    },
  },
}));
