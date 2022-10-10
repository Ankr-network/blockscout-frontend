import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { FantomSDK, FANTOM_BLOCK_WEEK_OFFSET } from '@ankr.com/staking-sdk';

import { IBaseHistoryData } from 'modules/common/components/HistoryDialog/types';
import { Token } from 'modules/common/types/token';

import { ACTIONS_PREFIX } from '../const';

export interface IGetHistoryData {
  [Token.aFTMb]: IBaseHistoryData;
  [Token.aFTMc]: IBaseHistoryData;
}

interface IGetHistoryArgs {
  step: number; // 1 step == 2 weeks
}

const FANTOM_BLOCK_2_WEEKS_OFFSET = FANTOM_BLOCK_WEEK_OFFSET * 2;

export const getHistory = createAction<
  RequestAction<IGetHistoryData, IGetHistoryData>,
  [IGetHistoryArgs]
>(
  `${ACTIONS_PREFIX}getHistory`,
  ({ step }): RequestAction => ({
    request: {
      promise: (async (): Promise<IGetHistoryData> => {
        const sdk = await FantomSDK.getInstance();
        const latestBlock = await sdk.getLatestBlock();

        const from = latestBlock - FANTOM_BLOCK_2_WEEKS_OFFSET * (step + 1);
        const to = latestBlock - FANTOM_BLOCK_2_WEEKS_OFFSET * step;

        const historyData = await sdk.getTxEventsHistoryRange(from, to);

        return {
          [Token.aFTMb]: {
            stakeEvents: historyData.completedBond,
            unstakeEvents: historyData.unstakeBond,
          },
          [Token.aFTMc]: {
            stakeEvents: historyData.completedCertificate,
            unstakeEvents: historyData.unstakeCertificate,
          },
        };
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
    },
  }),
);
