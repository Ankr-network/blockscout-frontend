import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { ETH_BLOCK_2_WEEKS_OFFSET, EthereumSDK } from '@ankr.com/staking-sdk';

import { IBaseHistoryData } from 'modules/common/components/HistoryDialog/types';
import { Token } from 'modules/common/types/token';

import { ETH_ACTIONS_PREFIX } from '../const';

export interface IGetHistoryData {
  [Token.aETHb]: IBaseHistoryData;
  [Token.aETHc]: IBaseHistoryData;
}

interface IGetHistoryArgs {
  step: number; // 1 step == 2 weeks
}

export const getHistory = createAction<
  RequestAction<IGetHistoryData, IGetHistoryData>,
  [IGetHistoryArgs]
>(
  `${ETH_ACTIONS_PREFIX}getHistory`,
  ({ step }): RequestAction => ({
    request: {
      promise: (async (): Promise<IGetHistoryData> => {
        const sdk = await EthereumSDK.getInstance();
        const latestBlock = await sdk.getLatestBlock();

        const from = latestBlock - ETH_BLOCK_2_WEEKS_OFFSET * (step + 1);
        const to = latestBlock - ETH_BLOCK_2_WEEKS_OFFSET * step;

        const historyData = await sdk.getTxEventsHistoryRange(from, to);

        return {
          [Token.aETHb]: {
            stakeEvents: historyData.completedBond,
            unstakeEvents: historyData.unstakeBond,
          },
          [Token.aETHc]: {
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
