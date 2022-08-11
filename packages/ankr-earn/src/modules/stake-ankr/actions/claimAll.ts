import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TStore } from 'modules/common/types/ReduxRequests';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

import { getHistoryData } from './getHistoryData';

type TTxHash = string;

export const claimAll = createAction<RequestAction<TTxHash, TTxHash>>(
  `${ANKR_ACTIONS_PREFIX}claimAll`,
  () => ({
    request: {
      promise: (async (): Promise<TTxHash> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.claimAll();
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
        store.dispatchRequest(getHistoryData());
      },
    },
  }),
);
