import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TStore } from 'modules/common/types/ReduxRequests';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { AvalancheSDK } from '../api/AvalancheSDK';
import { TAvaxSyntToken } from '../types';

import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

interface IRes {
  data: void;
}

interface IUnstakeArgs {
  amount: BigNumber;
  token: TAvaxSyntToken;
}

export const unstake = createSmartAction<
  RequestAction<void, void>,
  [IUnstakeArgs]
>(
  'avax/unstake',
  ({ amount, token }): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk = await AvalancheSDK.getInstance();

        return sdk.unstake(amount, token);
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
        store.dispatchRequest(getUnstakeDate());

        return response;
      },
    },
  }),
);
