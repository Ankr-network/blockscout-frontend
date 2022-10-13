import { RequestAction, resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { BinanceSDK } from '@ankr.com/staking-sdk';
import { IWeb3SendResult } from 'common';

import { TStore } from 'modules/common/types/ReduxRequests';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { RoutesConfig } from '../Routes';
import { TBnbSyntToken } from '../types';

import { approveABNBCUnstake } from './approveABNBCUnstake';
import { fetchPendingValues } from './fetchPendingValues';
import { fetchStats } from './fetchStats';

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
      promise: (async (): Promise<IWeb3SendResult> => {
        const sdk: BinanceSDK = await BinanceSDK.getInstance();

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
      ) => {
        await response.data?.receiptPromise;

        store.dispatchRequest(fetchStats());
        store.dispatchRequest(fetchPendingValues());
        store.dispatchRequest(getUnstakeDate());
        store.dispatch(resetRequests([approveABNBCUnstake.toString()]));

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
