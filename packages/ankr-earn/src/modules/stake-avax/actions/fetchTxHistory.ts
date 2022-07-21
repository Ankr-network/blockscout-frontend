import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { AvalancheSDK, ITxEventsHistoryData } from '@ankr.com/staking-sdk';

import { ACTION_CACHE_SEC } from 'modules/common/const';

export const fetchTxHistory = createSmartAction<
  RequestAction<ITxEventsHistoryData, ITxEventsHistoryData>
>(
  'avax/fetchTxHistory',
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<ITxEventsHistoryData> => {
        const sdk = await AvalancheSDK.getInstance();

        return sdk.getTxEventsHistory();
      })(),
    },
    meta: {
      asMutation: false,
      getData: (data: ITxEventsHistoryData): ITxEventsHistoryData => data,
      cache: ACTION_CACHE_SEC,
    },
  }),
);
