import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { BinanceSDK, ITxEventsHistoryData } from '../api/BinanceSDK';

export const fetchTxHistory = createSmartAction<
  RequestAction<ITxEventsHistoryData, ITxEventsHistoryData>
>(
  'bnb/fetchTxHistory',
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<ITxEventsHistoryData> => {
        const sdk: BinanceSDK = await BinanceSDK.getInstance();

        return sdk.getTxEventsHistory();
      })(),
    },
    meta: {
      asMutation: false,
      getData: (data: ITxEventsHistoryData): ITxEventsHistoryData => data,
    },
  }),
);
