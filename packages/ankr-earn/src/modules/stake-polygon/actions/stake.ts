import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { PolygonSDK } from '../api/PolygonSDK';
import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

interface IStakePayload {
  amount: BigNumber;
}

interface IStakeResponseData {}

export const stake = createSmartAction<
  RequestAction<IStakeResponseData, IStakeResponseData>,
  [IStakePayload]
>('polygon/stake', ({ amount }) => ({
  request: {
    promise: (async () => {
      /*
      const sdk = PolygonSDK.getInstance();
      return await sdk.stake(amount);
      */
      return true;
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    getData: data => data,
    onSuccess: (response, action, store) => {
      store.dispatchRequest(fetchStats());
      store.dispatchRequest(fetchTxHistory());
      return response;
    },
  },
}));
