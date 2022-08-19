import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TxHash } from 'modules/common/types';
import { TStore } from 'modules/common/types/ReduxRequests';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { ANKR_ACTIONS_PREFIX } from '../const';

import { getHistoryData } from './getHistoryData';

export const claimAll = createAction<RequestAction<TxHash, TxHash>>(
  `${ANKR_ACTIONS_PREFIX}claimAll`,
  () => ({
    request: {
      promise: (async (): Promise<TxHash> => {
        const sdk = await AnkrStakingSDK.getInstance();

        return sdk.claimAll();
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
        store.dispatchRequest(getHistoryData());
      },
    },
  }),
);
