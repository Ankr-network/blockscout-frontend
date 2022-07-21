import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TStore } from 'modules/common/types/ReduxRequests';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

import { getCommonData } from './getCommonData';

interface IUnstakeArgs {
  amount: BigNumber;
  provider: string;
}

export const unstake = createSmartAction<
  RequestAction<void, void>,
  [IUnstakeArgs]
>(
  `${ANKR_ACTIONS_PREFIX}/unstake`,
  ({ amount, provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.undelegate(provider, amount);
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
        store.dispatchRequest(getCommonData());

        return response;
      },
    },
  }),
);
