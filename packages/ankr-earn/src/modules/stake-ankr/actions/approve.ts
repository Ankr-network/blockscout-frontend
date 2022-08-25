import { RequestAction, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IApproveResponse } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const approve = createAction<
  RequestAction<IApproveResponse, IApproveResponse>,
  [BigNumber]
>(`${ANKR_ACTIONS_PREFIX}approve`, amount => ({
  request: {
    promise: (async (): Promise<IApproveResponse> => {
      const sdk = await AnkrStakingSDK.getInstance();

      return sdk.approve(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    onSuccess: (
      response: { data: IApproveResponse },
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
