import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ITxEventsHistoryData, PolygonSDK } from '@ankr.com/staking-sdk';

import { ACTION_CACHE_SEC } from 'modules/common/const';

export const fetchTxHistory = createSmartAction<
  RequestAction<ITxEventsHistoryData, ITxEventsHistoryData>
>('polygon/fetchTxHistory', () => ({
  request: {
    promise: (async (): Promise<ITxEventsHistoryData> => {
      const sdk = await PolygonSDK.getInstance();
      return sdk.getTxEventsHistory();
    })(),
  },
  meta: {
    asMutation: false,
    cache: ACTION_CACHE_SEC,
  },
}));
