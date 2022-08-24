import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MaticEthSDK } from '@ankr.com/staking-sdk';

import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';
import { RoutesConfig } from '../Routes';

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
>(`${MATIC_ETH_ACTIONS_PREFIX}stake`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<{ txHash: string }> => {
      const sdk = await MaticEthSDK.getInstance();
      return sdk.stake(amount, token);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
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
