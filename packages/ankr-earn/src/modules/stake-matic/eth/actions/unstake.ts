import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IWeb3SendResult } from '@ankr.com/provider';
import { MaticEthSDK } from '@ankr.com/staking-sdk';

import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';
import { RoutesConfig } from '../Routes';

import { fetchStats } from './fetchStats';
import { fetchTotalHistory } from './fetchTotalHistory';
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
      store.dispatchRequest(fetchTotalHistory());
      store.dispatchRequest(getAnkrBalance());
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
}));
