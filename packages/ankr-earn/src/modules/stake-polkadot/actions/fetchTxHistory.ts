import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ACTION_CACHE_SEC } from 'modules/common/const';

import {
  ITxEventsHistoryData,
  PolkadotStakeSDK,
} from '../api/PolkadotStakeSDK';

export const fetchTxHistory = createSmartAction<
  RequestAction<ITxEventsHistoryData, ITxEventsHistoryData>
>(
  'polkadot/fetchTxHistory',
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<ITxEventsHistoryData> => {
        const sdk = await PolkadotStakeSDK.getInstance();

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
