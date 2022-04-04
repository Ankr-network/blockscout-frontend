import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';

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
    promise: (async (): Promise<{ txHash: string }> => {
      const sdk = await PolygonSDK.getInstance();
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

      if (response.data.txHash) {
        store.dispatch(push(response.data.txHash));
      }
      return response;
    },
  },
}));
