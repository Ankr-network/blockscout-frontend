import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ACTION_CACHE_SEC } from 'modules/common/const';

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
      // ! seems it is not working with promise based requests
      cache: ACTION_CACHE_SEC,
    },
  }),
);
