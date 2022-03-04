import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { TTxEventsHistoryGroupData } from 'modules/stake/api/getTxEventsHistoryGroup';

import { FantomSDK } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

export interface IGetHistory {
  stakeEvents: TTxEventsHistoryGroupData;
  withdrawnEvents: TTxEventsHistoryGroupData;
  pendingEvents: TTxEventsHistoryGroupData;
  totalPending: BigNumber;
}

export const getHistory = createAction<RequestAction<IGetHistory, IGetHistory>>(
  `${ACTIONS_PREFIX}getHistory`,
  () => ({
    request: {
      promise: (async (): Promise<IGetHistory> => {
        const sdk = await FantomSDK.getInstance();

        return sdk.getTxHistory();
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      getData: data => data,
    },
  }),
);
