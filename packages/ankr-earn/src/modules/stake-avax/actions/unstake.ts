import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { IWeb3SendResult } from '@ankr.com/provider';
import { AvalancheSDK } from '@ankr.com/staking-sdk';

import { TStore } from 'modules/common/types/ReduxRequests';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { TAvaxSyntToken } from '../types';

import { fetchPendingValues } from './fetchPendingValues';
import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

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
      promise: (async (): Promise<IWeb3SendResult> => {
        const sdk = await AvalancheSDK.getInstance();

        return sdk.unstake(amount, token);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onSuccess: async (
        response,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ): Promise<IWeb3SendResult> => {
        await response.data?.receiptPromise;

        store.dispatchRequest(fetchStats());
        store.dispatchRequest(fetchPendingValues());
        store.dispatchRequest(fetchTxHistory());
        store.dispatchRequest(getUnstakeDate());

        return response;
      },
    },
  }),
);
