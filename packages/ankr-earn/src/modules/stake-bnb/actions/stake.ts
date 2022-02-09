import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { BinanceSDK } from '../api/BinanceSDK';
import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

export const stake = createSmartAction<RequestAction<void, void>>(
  'bnb/stake',
  (amount: BigNumber): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk: BinanceSDK = await BinanceSDK.getInstance();

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
  }),
);
