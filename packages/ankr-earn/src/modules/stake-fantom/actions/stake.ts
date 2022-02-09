import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { stake as stakeFTM } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';
import { getCommonData } from './getCommonData';

interface IStakeResponseData {}

export const stake = createAction<
  RequestAction<IStakeResponseData, IStakeResponseData>,
  [BigNumber]
>(`${ACTIONS_PREFIX}stake`, amount => ({
  request: {
    promise: (async () => {
      return stakeFTM(amount);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    getData: data => data,
    onSuccess: (response, _action, store) => {
      store.dispatchRequest(getCommonData());
      return response;
    },
  },
}));
