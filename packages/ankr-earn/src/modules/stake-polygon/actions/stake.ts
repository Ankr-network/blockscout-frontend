import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { PolygonSDK } from '../api/PolygonSDK';
import { RoutesConfig } from '../Routes';
import { TMaticSyntToken } from '../types';

import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';

interface IStakePayload {
  amount: BigNumber;
  token: TMaticSyntToken;
}

interface IStakeResponseData {}

export const stake = createSmartAction<
  RequestAction<IStakeResponseData, IStakeResponseData>,
  [IStakePayload]
>('polygon/stake', ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<{ txHash: string }> => {
      const sdk = await PolygonSDK.getInstance();
      return sdk.stake(amount, token);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    getData: data => data,
    onSuccess: (response, _action, store) => {
      store.dispatchRequest(fetchStats());
      store.dispatchRequest(fetchTxHistory());

      if (response.data.txHash) {
        const path = RoutesConfig.stakeStep.generatePath(
          token,
          response.data.txHash,
        );

        store.dispatch(push(path));
      }
      return response;
    },
  },
}));
