import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { TTxEventsHistoryGroupData } from 'modules/stake/api/getTxEventsHistoryGroup';
import { createAction } from 'redux-smart-actions';
import { getTxHistory } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

export interface IGetHistory {
  stakeEvents: TTxEventsHistoryGroupData;
  pendingEvents: TTxEventsHistoryGroupData;
  withdrawnEvents: TTxEventsHistoryGroupData;
  totalPending: BigNumber;
}

export const getHistory = createAction<RequestAction<IGetHistory, IGetHistory>>(
  `${ACTIONS_PREFIX}getHistory`,
  () => ({
    request: {
      promise: (async (): Promise<IGetHistory> => {
        return getTxHistory();
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      getData: data => data,
    },
  }),
);
