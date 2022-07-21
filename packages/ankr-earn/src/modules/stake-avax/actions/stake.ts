import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { AvalancheSDK } from '@ankr.com/staking-sdk';

import { TStore } from 'modules/common/types/ReduxRequests';

import { RoutesConfig } from '../Routes';
import { TAvaxSyntToken } from '../types';

import { fetchPendingValues } from './fetchPendingValues';
import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

interface IRes {
  data: void;
}

interface IStakeArgs {
  amount: BigNumber;
  token: TAvaxSyntToken;
}

export const stake = createSmartAction<RequestAction<void, void>, [IStakeArgs]>(
  'avax/stake',
  ({ amount, token }): RequestAction => ({
    request: {
      promise: (async (): Promise<{ txHash: string }> => {
        const sdk = await AvalancheSDK.getInstance();

        return sdk.stake(amount, token);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onSuccess: (
        response,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ): IRes => {
        store.dispatchRequest(fetchStats());
        store.dispatchRequest(fetchPendingValues());
        store.dispatchRequest(fetchTxHistory());

        if (response.data.txHash) {
          store.dispatch(
            push(
              RoutesConfig.stakeSteps.generatePath({
                txHash: response.data.txHash,
                tokenOut: token,
              }),
            ),
          );
        }

        return response;
      },
    },
  }),
);
