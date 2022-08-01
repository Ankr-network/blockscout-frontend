import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TStore } from 'modules/common/types/ReduxRequests';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

import { getActiveStakingData } from './getActiveStakingData';
import { getHistoryData } from './getHistoryData';
import { getUnstakingData } from './getUnstakingData';

type TTxHash = string;

export const claimAllRewards = createAction<RequestAction<TTxHash, TTxHash>>(
  `${ANKR_ACTIONS_PREFIX}claimAllRewards`,
  () => ({
    request: {
      promise: (async (): Promise<TTxHash> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.claimAllRewards();
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
        store.dispatchRequest(getUnstakingData());
        store.dispatchRequest(getActiveStakingData());
        store.dispatchRequest(getHistoryData());
      },
    },
  }),
);
