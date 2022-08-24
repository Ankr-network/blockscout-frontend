import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TxHash } from 'modules/common/types';
import { TStore } from 'modules/common/types/ReduxRequests';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';
import { RoutesConfig } from '../Routes';

import { getCommonData } from './getCommonData';

interface IUnstakeArgs {
  amount: BigNumber;
  provider: string;
}

export const unstake = createSmartAction<
  RequestAction<TxHash, TxHash>,
  [IUnstakeArgs]
>(
  `${ANKR_ACTIONS_PREFIX}unstake`,
  ({ amount, provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<TxHash> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.undelegate(provider, amount);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onSuccess: (
        response: { data: TxHash },
        _action: RequestAction,
        store: TStore<IStoreState>,
      ) => {
        store.dispatchRequest(getCommonData());
        const txHash = response.data;

        if (txHash) {
          store.dispatch(
            push(
              RoutesConfig.unstakeSteps.generatePath({
                txHash,
              }),
            ),
          );
        }

        return response;
      },
    },
  }),
);
