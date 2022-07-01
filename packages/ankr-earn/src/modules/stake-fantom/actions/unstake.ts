import { RequestAction, resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult } from '@ankr.com/provider';

import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { FantomSDK } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';
import { TFtmSyntToken } from '../types/TFtmSyntToken';

import { getBurnFee } from './getBurnFee';
import { getCommonData } from './getCommonData';

export const unstake = createAction<RequestAction, [BigNumber, TFtmSyntToken]>(
  `${ACTIONS_PREFIX}unstake`,
  (amount, token) => ({
    request: {
      promise: (async (): Promise<IWeb3SendResult> => {
        const sdk = await FantomSDK.getInstance();

        return sdk.unstake(amount, token);
      })(),
    },
    meta: {
      showNotificationOnError: true,
      asMutation: true,
      onSuccess: async (response, _action, { dispatch, dispatchRequest }) => {
        dispatch(getCommonData());
        dispatch(resetRequests([getBurnFee.toString()]));
        dispatchRequest(getUnstakeDate());

        return response;
      },
    },
  }),
);
