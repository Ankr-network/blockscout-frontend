import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ITxEventsHistoryGroupItem, FantomSDK } from '@ankr.com/staking-sdk';

import { ACTION_CACHE_SEC } from 'modules/common/const';

import { ACTIONS_PREFIX } from '../const';

export interface ITotalGetHistoryData {
  stakeEventsAFTMB: ITxEventsHistoryGroupItem[];
  stakeEventsAFTMC: ITxEventsHistoryGroupItem[];
  pendingEventsAFTMB: ITxEventsHistoryGroupItem[];
  pendingEventsAFTMC: ITxEventsHistoryGroupItem[];
  withdrawnEventsAFTMB: ITxEventsHistoryGroupItem[];
  withdrawnEventsAFTMC: ITxEventsHistoryGroupItem[];
  totalPending: BigNumber;
}

export const getTotalHistoryData = createAction<
  RequestAction<ITotalGetHistoryData, ITotalGetHistoryData>
>(`${ACTIONS_PREFIX}getTotalHistoryData`, () => ({
  request: {
    promise: (async (): Promise<ITotalGetHistoryData> => {
      const sdk = await FantomSDK.getInstance();

      const [historyData, totalPending] = await Promise.all([
        sdk.getTxEventsHistory(),
        sdk.getPendingClaim(),
      ]);

      return {
        stakeEventsAFTMB: historyData.completedBond,
        stakeEventsAFTMC: historyData.completedCertificate,
        pendingEventsAFTMB: historyData.pendingBond,
        pendingEventsAFTMC: historyData.pendingCertificate,
        withdrawnEventsAFTMB: historyData.unstakeBond,
        withdrawnEventsAFTMC: historyData.unstakeCertificate,
        totalPending,
      };
    })(),
  },
  meta: {
    showNotificationOnError: true,
    cache: ACTION_CACHE_SEC,
  },
}));
