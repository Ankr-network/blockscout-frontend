import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TStore } from 'modules/common/types/ReduxRequests';

import { BinanceSDK } from '../api/BinanceSDK';
import { TBnbSyntToken } from '../types';

import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

interface IStakeArgs {
  amount: BigNumber;
  token: TBnbSyntToken;
}

export const stake = createSmartAction<RequestAction<void, void>, [IStakeArgs]>(
  'bnb/stake',
  ({ amount, token }): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk: BinanceSDK = await BinanceSDK.getInstance();

        return sdk.stake(amount, token);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      getData: (data: void): void => data,
      onSuccess: (
        response,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ) => {
        store.dispatchRequest(fetchStats());
        store.dispatchRequest(fetchTxHistory());

        return response;
      },
    },
  }),
);
