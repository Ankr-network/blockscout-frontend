import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ACTION_CACHE_SEC } from 'modules/common/const';

import { ITxEventsHistoryData, PolygonSDK } from '../api/PolygonSDK';

export const fetchTxHistory = createSmartAction<
  RequestAction<ITxEventsHistoryData, ITxEventsHistoryData>
>('polygon/fetchTxHistory', () => ({
  request: {
    promise: (async (): Promise<ITxEventsHistoryData> => {
      const sdk: PolygonSDK = await PolygonSDK.getInstance();
      return sdk.getTxEventsHistory();
    })(),
  },
  meta: {
    asMutation: false,
    getData: (data: ITxEventsHistoryData): ITxEventsHistoryData => data,
    cache: ACTION_CACHE_SEC,
  },
}));
