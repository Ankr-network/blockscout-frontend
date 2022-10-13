import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import {
  PolygonOnEthereumSDK,
  MATIC_ETH_BLOCK_2_WEEKS_OFFSET,
} from '@ankr.com/staking-sdk';

import { IBaseHistoryData } from 'modules/common/components/HistoryDialog/types';
import { Token } from 'modules/common/types/token';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';

export interface IGetHistoryData {
  [Token.aMATICb]: IBaseHistoryData;
  [Token.aMATICc]: IBaseHistoryData;
}

interface IGetHistoryArgs {
  step: number; // 1 step == 2 weeks
}

export const fetchHistory = createAction<
  RequestAction<IGetHistoryData, IGetHistoryData>,
  [IGetHistoryArgs]
>(
  `${MATIC_ETH_ACTIONS_PREFIX}fetchHistory`,
  ({ step }): RequestAction => ({
    request: {
      promise: (async (): Promise<IGetHistoryData> => {
        const sdk = await PolygonOnEthereumSDK.getInstance();
        const latestBlock = await sdk.getLatestBlock();

        const from = latestBlock - MATIC_ETH_BLOCK_2_WEEKS_OFFSET * (step + 1);
        const to = latestBlock - MATIC_ETH_BLOCK_2_WEEKS_OFFSET * step;

        const historyData = await sdk.getTxEventsHistoryRange(from, to);

        return {
          [Token.aMATICb]: {
            stakeEvents: historyData.completedBond,
            unstakeEvents: historyData.unstakeBond,
          },
          [Token.aMATICc]: {
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
