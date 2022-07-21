import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TStore } from 'modules/common/types/ReduxRequests';

import { ANKR_ACTIONS_PREFIX } from '../const';

import { getCommonData } from './getCommonData';

export const claim = createSmartAction<RequestAction<void, void>>(
  `${ANKR_ACTIONS_PREFIX}/claim`,
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {})(),
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
