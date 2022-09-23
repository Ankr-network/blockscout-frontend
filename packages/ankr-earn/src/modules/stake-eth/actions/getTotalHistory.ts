import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { EthereumSDK, ITxEventsHistoryData } from '@ankr.com/staking-sdk';

import { ACTION_CACHE_SEC } from 'modules/common/const';

import { ETH_ACTIONS_PREFIX } from '../const';

export const getTotalHistory = createAction<
  RequestAction<ITxEventsHistoryData, ITxEventsHistoryData>
>(`${ETH_ACTIONS_PREFIX}getTotalHistory`, () => ({
  request: {
    promise: (async (): Promise<ITxEventsHistoryData> => {
      const sdk = await EthereumSDK.getInstance();

      return sdk.getTxEventsHistory();
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    cache: ACTION_CACHE_SEC,
  },
}));
