import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { IWeb3SendResult } from '@ankr.com/provider';
import { AvalancheSDK } from '@ankr.com/staking-sdk';

import { TStore } from 'modules/common/types/ReduxRequests';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { RoutesConfig } from '../Routes';
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

        if (response.data.transactionHash) {
          const path = RoutesConfig.unstakeSuccess.generatePath(
            token,
            response.data.transactionHash,
          );

          store.dispatch(push(path));
        }

        return response;
      },
    },
  }),
);
