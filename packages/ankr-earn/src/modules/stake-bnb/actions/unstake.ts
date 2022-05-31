import { RequestAction, resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TStore } from 'modules/common/types/ReduxRequests';

import { BinanceSDK } from '../api/BinanceSDK';
import { TBnbSyntToken } from '../types';

import { approveABNBCUnstake } from './approveABNBCUnstake';
import { fetchPendingValues } from './fetchPendingValues';
import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

interface IUnstakeArgs {
  amount: BigNumber;
  token: TBnbSyntToken;
}

export const unstake = createSmartAction<
  RequestAction<void, void>,
  [IUnstakeArgs]
>(
  'bnb/unstake',
  ({ amount, token }): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk: BinanceSDK = await BinanceSDK.getInstance();

        return sdk.unstake(amount, token);
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
        store.dispatchRequest(fetchPendingValues());
        store.dispatchRequest(fetchTxHistory());
        store.dispatch(resetRequests([approveABNBCUnstake.toString()]));

        return response;
      },
    },
  }),
);
