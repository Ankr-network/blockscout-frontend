import { RequestAction, resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult } from 'provider';

import { FantomSDK } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

import { getBurnFee } from './getBurnFee';
import { getCommonData } from './getCommonData';

export const unstake = createAction<RequestAction, [BigNumber]>(
  `${ACTIONS_PREFIX}unstake`,
  amount => ({
    request: {
      promise: (async (): Promise<IWeb3SendResult> => {
        const sdk = await FantomSDK.getInstance();

        return sdk.unstake(amount);
      })(),
    },
    meta: {
      showNotificationOnError: true,
      asMutation: true,
      onSuccess: async (response, _action, { dispatch }) => {
        dispatch(getCommonData());
        dispatch(resetRequests([getBurnFee.toString()]));

        return response;
      },
    },
  }),
);
