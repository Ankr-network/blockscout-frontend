import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IWeb3SendResult } from '@ankr.com/provider';
import { MaticEthSDK } from '@ankr.com/staking-sdk';

import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';

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
>(`${MATIC_ETH_ACTIONS_PREFIX}unstake`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult> => {
      const sdk = await MaticEthSDK.getInstance();
      return sdk.unstake(amount, token);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    asMutation: true,
    onSuccess: async (response, action, store) => {
      await response.data?.receiptPromise;

      store.dispatchRequest(fetchStats());
      store.dispatchRequest(fetchTxHistory());
      store.dispatchRequest(getAnkrBalance());
      store.dispatchRequest(getUnstakeDate());

      return response;
    },
  },
}));
