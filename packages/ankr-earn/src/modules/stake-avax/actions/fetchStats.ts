import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { AvalancheSDK } from '@ankr.com/staking-sdk';

import { withStore } from 'modules/common/utils/withStore';

interface IFetchStatsResponseData {
  aAVAXbBalance: BigNumber;
  aAVAXcBalance: BigNumber;
  avaxBalance: BigNumber;
  minimumStake: BigNumber;
  aAVAXcRatio: BigNumber;
}

export const fetchStats = createSmartAction<
  RequestAction<IFetchStatsResponseData, IFetchStatsResponseData>
>(
  'avax/fetchStats',
  (): RequestAction => ({
    request: {
      promise: async (): Promise<IFetchStatsResponseData> => {
        const sdk = await AvalancheSDK.getInstance();

        const [aAVAXbBalance, aAVAXcBalance, avaxBalance, minimumStake, ratio] =
          await Promise.all([
            sdk.getABBalance(),
            sdk.getACBalance(),
            sdk.getAVAXBalance(),
            sdk.getMinimumStake(),
            sdk.getACRatio(),
          ]);

        return {
          aAVAXbBalance,
          aAVAXcBalance,
          avaxBalance,
          minimumStake,
          aAVAXcRatio: ratio,
        };
      },
    },
    meta: {
      asMutation: false,
      getData: (data: IFetchStatsResponseData): IFetchStatsResponseData => data,
      onRequest: withStore,
    },
  }),
);
