import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { TStore } from 'modules/common/types/ReduxRequests';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';
import { BinanceSDK } from '../api/BinanceSDK';
import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

interface IRes {
  data: void;
}

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
      getData: (data: void): void => data,
      onSuccess: (
        response: IRes,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ): IRes => {
        store.dispatchRequest(fetchStats());
        store.dispatchRequest(fetchTxHistory());

        return response;
      },
    },
  }),
);
