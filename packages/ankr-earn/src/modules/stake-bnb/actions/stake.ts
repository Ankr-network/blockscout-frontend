import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { TStore } from 'modules/common/types/ReduxRequests';

import { TBnbSyntToken } from '../types';

import { fetchPendingValues } from './fetchPendingValues';
import { fetchStats } from './fetchStats';

interface IStakeArgs {
  amount: BigNumber;
  token: TBnbSyntToken;
  code?: string;
}

export const stake = createSmartAction<RequestAction<void, void>, [IStakeArgs]>(
  'bnb/stake',
  ({ amount, token, code }): RequestAction => ({
    request: {
      promise: (async (): Promise<{ txHash: string }> => {
        const sdk: BinanceSDK = await BinanceSDK.getInstance();

        return sdk.stake(amount, token, undefined, code);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onSuccess: (
        response,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ) => {
        store.dispatchRequest(fetchStats());
        store.dispatchRequest(fetchPendingValues());

        if (response.data.txHash) {
          store.dispatch(push(`${token}/${response.data.txHash}/`));
        }
        return response;
      },
    },
  }),
);
