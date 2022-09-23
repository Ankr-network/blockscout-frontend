import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ITxEventsHistoryData, MaticEthSDK } from '@ankr.com/staking-sdk';

import { ACTION_CACHE_SEC } from 'modules/common/const';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';

export const fetchTotalHistory = createSmartAction<
  RequestAction<ITxEventsHistoryData, ITxEventsHistoryData>
>(`${MATIC_ETH_ACTIONS_PREFIX}fetchTotalHistory`, () => ({
  request: {
    promise: (async (): Promise<ITxEventsHistoryData> => {
      const sdk = await MaticEthSDK.getInstance();
      return sdk.getTxEventsHistory();
    })(),
  },
  meta: {
    asMutation: false,
    cache: ACTION_CACHE_SEC,
  },
}));
