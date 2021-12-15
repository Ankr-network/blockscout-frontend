import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { ITxEventsHistoryData, PolygonSDK } from '../api/PolygonSDK';

export const fetchTxHistory = createSmartAction<
  RequestAction<ITxEventsHistoryData, ITxEventsHistoryData>
>('polygon/fetchTxHistory', () => ({
  request: {
    promise: (async (): Promise<ITxEventsHistoryData> => {
      const sdk: PolygonSDK = PolygonSDK.getInstance();
      return await sdk.getTxEventsHistory();
    })(),
  },
  meta: {
    asMutation: false,
    getData: (data: ITxEventsHistoryData): ITxEventsHistoryData => data,
  },
}));
