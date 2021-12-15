import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { PolygonSDK } from '../api/PolygonSDK';
import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

interface IUnstakePayload {
  amount: BigNumber;
}

interface IUnstakeResponseData {}

export const unstake = createSmartAction<
  RequestAction<IUnstakeResponseData, IUnstakeResponseData>,
  [IUnstakePayload]
>('polygon/unstake', ({ amount }) => ({
  request: {
    promise: (async () => {
      const sdk = PolygonSDK.getInstance();
      return await sdk.unstake(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    asMutation: true,
    getData: data => data,
    onSuccess: (response, action, store) => {
      store.dispatchRequest(fetchStats());
      store.dispatchRequest(fetchTxHistory());
      return response;
    },
  },
}));
