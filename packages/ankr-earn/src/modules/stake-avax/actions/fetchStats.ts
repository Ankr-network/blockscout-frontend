import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { AvalancheSDK } from '../api/AvalancheSDK';

interface IFetchStatsResponseData {
  aAVAXbBalance: BigNumber;
  avaxBalance: BigNumber;
  minimumStake: BigNumber;
  minimumUnstake: BigNumber;
  pendingUnstakes: BigNumber;
  relayerFee: BigNumber;
}

export const fetchStats = createSmartAction<
  RequestAction<IFetchStatsResponseData, IFetchStatsResponseData>
>(
  'avax/fetchStats',
  (): RequestAction => ({
    request: {
      promise: async (): Promise<IFetchStatsResponseData> => {
        const sdk = await AvalancheSDK.getInstance();

        const [
          aAVAXbBalance,
          avaxBalance,
          minimumStake,
          pendingUnstakes,
          relayerFee,
        ] = await Promise.all([
          sdk.getAAVAXBBalance(),
          sdk.getAVAXBalance(),
          sdk.getMinimumStake(),
          sdk.getPendingUnstakes(),
          sdk.getRelayerFee(),
        ]);

        return {
          aAVAXbBalance,
          avaxBalance,
          minimumStake: minimumStake.plus(relayerFee),
          minimumUnstake: minimumStake,
          pendingUnstakes,
          relayerFee,
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
