import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import {
  BinanceSDK,
  BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET,
} from '@ankr.com/staking-sdk';

import { IBaseHistoryData } from 'modules/common/components/HistoryDialog/types';
import { Token } from 'modules/common/types/token';

export interface IGetHistoryData {
  [Token.aBNBb]: IBaseHistoryData;
  [Token.aBNBc]: IBaseHistoryData;
}

interface IGetHistoryArgs {
  step: number; // 1 step == 2 weeks
}

export const fetchHistory = createAction<
  RequestAction<IGetHistoryData, IGetHistoryData>,
  [IGetHistoryArgs]
>(
  'bnb/fetchHistory',
  ({ step }): RequestAction => ({
    request: {
      promise: (async (): Promise<IGetHistoryData> => {
        const sdk = await BinanceSDK.getInstance();
        const latestBlock = await sdk.getLatestBlock();

        const from =
          latestBlock - BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET * (step + 1);
        const to = latestBlock - BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET * step;

        const historyData = await sdk.getTxEventsHistoryRange(from, to);

        return {
          [Token.aBNBb]: {
            stakeEvents: historyData.completedBond,
            unstakeEvents: historyData.unstakeBond,
          },
          [Token.aBNBc]: {
            stakeEvents: historyData.completedCertificate,
            unstakeEvents: historyData.unstakeCertificate,
          },
        };
      })(),
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
