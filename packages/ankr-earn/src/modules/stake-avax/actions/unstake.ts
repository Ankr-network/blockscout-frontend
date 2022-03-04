import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TStore } from 'modules/common/types/ReduxRequests';

import { AvalancheSDK } from '../api/AvalancheSDK';

import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

interface IRes {
  data: void;
}

export const unstake = createSmartAction<RequestAction<void, void>>(
  'avax/unstake',
  (amount: BigNumber): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk = await AvalancheSDK.getInstance();

        return sdk.unstake(amount);
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
