import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { PolygonSDK } from '@ankr.com/staking-sdk';

import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { fetchStats } from './fetchStats';
import { fetchTxHistory } from './fetchTxHistory';
import { getAnkrBalance } from './getAnkrBalance';

interface IUnstakePayload {
  amount: BigNumber;
  token: TMaticSyntToken;
}

interface IUnstakeResponseData {}

export const unstake = createSmartAction<
  RequestAction<IUnstakeResponseData, IUnstakeResponseData>,
  [IUnstakePayload]
>('polygon/unstake', ({ amount, token }) => ({
  request: {
    promise: (async () => {
      const sdk = await PolygonSDK.getInstance();
      return sdk.unstake(amount, token);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    asMutation: true,
    onSuccess: (response, action, store) => {
      store.dispatchRequest(fetchStats());
      store.dispatchRequest(fetchTxHistory());
      store.dispatchRequest(getAnkrBalance());
      store.dispatchRequest(getUnstakeDate());

      return response;
    },
  },
}));
