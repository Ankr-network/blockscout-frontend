import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult } from 'provider';

import { stake as stakeFTM } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

import { getCommonData } from './getCommonData';

export const stake = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [BigNumber]
>(`${ACTIONS_PREFIX}stake`, amount => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult> => {
      return stakeFTM(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    asMutation: true,
    onSuccess: (response, _action, { dispatchRequest }) => {
      dispatchRequest(getCommonData());
      return response;
    },
  },
}));
