import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ITxEventsHistoryGroupItem } from '@ankr.com/staking-sdk';

import { ACTION_CACHE_SEC } from 'modules/common/const';

import { FantomSDK } from '../api/sdk';
import { ACTIONS_PREFIX } from '../const';

export interface IGetHistory {
  stakeEventsAFTMB: ITxEventsHistoryGroupItem[];
  stakeEventsAFTMC: ITxEventsHistoryGroupItem[];
  pendingEventsAFTMB: ITxEventsHistoryGroupItem[];
  pendingEventsAFTMC: ITxEventsHistoryGroupItem[];
  withdrawnEventsAFTMB: ITxEventsHistoryGroupItem[];
  withdrawnEventsAFTMC: ITxEventsHistoryGroupItem[];
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
      cache: ACTION_CACHE_SEC,
    },
  }),
);
