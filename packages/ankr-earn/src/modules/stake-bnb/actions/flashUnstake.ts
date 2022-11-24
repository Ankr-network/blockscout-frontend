import { t } from '@ankr.com/common';
import { RequestAction, resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { IWeb3SendResult } from '@ankr.com/provider';
import { BinanceSDK } from '@ankr.com/staking-sdk';

import { TStore } from 'modules/common/types/ReduxRequests';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { RoutesConfig } from '../Routes';
import { TBnbSyntToken } from '../types';

import { approveABNBCForSwapPool } from './approveABNBCFlashUnstake';
import { fetchPendingValues } from './fetchPendingValues';
import { fetchStats } from './fetchStats';

const INVALID_ARGUMENT_ERROR_CODE = 'INVALID_ARGUMENT';

interface IUnstakeArgs {
  amount: BigNumber;
  token: TBnbSyntToken;
}

export const flashUnstake = createSmartAction<
  RequestAction<void, void>,
  [IUnstakeArgs]
>(
  'bnb/flashUnstake',
  ({ amount, token }): RequestAction => ({
    request: {
      promise: (async (): Promise<IWeb3SendResult> => {
        const sdk: BinanceSDK = await BinanceSDK.getInstance();

        return sdk.flashUnstake(amount, token);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      getError: error => {
        if (error && error.code === INVALID_ARGUMENT_ERROR_CODE) {
          return t('validation.invalid-address');
        }
        return error;
      },
      onSuccess: async (
        response,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ) => {
        await response.data?.receiptPromise;

        store.dispatchRequest(fetchStats());
        store.dispatchRequest(fetchPendingValues());
        store.dispatchRequest(getUnstakeDate());
        store.dispatch(resetRequests([approveABNBCForSwapPool.toString()]));

        if (response.data.transactionHash) {
          const path = RoutesConfig.flashUnstakeSuccess.generatePath(
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
