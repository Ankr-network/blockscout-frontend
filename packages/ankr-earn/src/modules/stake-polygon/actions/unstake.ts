import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { PolygonSDK } from '../api/PolygonSDK';

import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';
import { getAnkrBalance } from './getAnkrBalance';

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
      const sdk = await PolygonSDK.getInstance();
      return sdk.unstake(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    asMutation: true,
    getData: data => data,
    onSuccess: (response, action, store) => {
      store.dispatchRequest(fetchStats());
      store.dispatchRequest(fetchTxHistory());
      store.dispatchRequest(getAnkrBalance());
      return response;
    },
  },
}));
