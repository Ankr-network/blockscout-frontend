import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { EthSDK, ITxEventsHistoryData } from 'modules/api/EthSDK';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { ETH_ACTIONS_PREFIX } from '../const';

export const getTxHistoryETH = createAction<
  RequestAction<ITxEventsHistoryData, ITxEventsHistoryData>
>(`${ETH_ACTIONS_PREFIX}getTxHistoryAETHB`, () => ({
  request: {
    promise: (async (): Promise<ITxEventsHistoryData> => {
      const sdk = await EthSDK.getInstance();

      return sdk.getTxEventsHistory();
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
    cache: ACTION_CACHE_SEC,
  },
}));
