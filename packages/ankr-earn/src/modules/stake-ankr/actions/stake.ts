import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TStore } from 'modules/common/types/ReduxRequests';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

import { getCommonData } from './getCommonData';

type TTxHash = string;

interface IStakeArgs {
  amount: BigNumber;
  provider: string;
}

export const stake = createSmartAction<
  RequestAction<TTxHash, TTxHash>,
  [IStakeArgs]
>(
  `${ANKR_ACTIONS_PREFIX}/stake`,
  ({ amount, provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<TTxHash> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.delegate(provider, amount);
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onSuccess: (
        response: { data: TTxHash },
        _action: RequestAction,
        store: TStore<IStoreState>,
      ) => {
        store.dispatchRequest(getCommonData());
        const txHash = response.data;

        if (txHash) {
          // todo: use routes config
          // store.dispatch(push(`${txHash}/`));
        }

        return response;
      },
    },
  }),
);
