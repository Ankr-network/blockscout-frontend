import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { BinanceSDK } from '../api/BinanceSDK';
import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

interface IStakePayload {
  amount: BigNumber;
}

interface IStakeResponseData {}

export const stake = createSmartAction<
  RequestAction<IStakeResponseData, IStakeResponseData>,
  [IStakePayload]
>('bnb/stake', ({ amount }) => ({
  request: {
    promise: (async () => {
      const sdk = await BinanceSDK.getInstance();
      return sdk.stake(amount);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    getData: data => data,
    onSuccess: (response, _action, store) => {
      store.dispatchRequest(fetchStats());
      store.dispatchRequest(fetchTxHistory());
      return response;
    },
  },
}));
