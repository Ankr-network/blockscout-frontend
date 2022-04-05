import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { featuresConfig } from 'modules/common/const';
import { withStore } from 'modules/common/utils/withStore';

import { BinanceSDK } from '../api/BinanceSDK';

interface IFetchStatsResponseData {
  aBNBbBalance: BigNumber;
  aBNBcBalance: BigNumber;
  bnbBalance: BigNumber;
  minimumStake: BigNumber;
  minAbnbbUnstake: BigNumber;
  minAbnbcUnstake: BigNumber;
  pendingUnstakes: BigNumber;
  relayerFee: BigNumber;
  aBNBcRatio: BigNumber;
}

export const fetchStats = createSmartAction<
  RequestAction<IFetchStatsResponseData, IFetchStatsResponseData>
>(
  'bnb/fetchStats',
  (): RequestAction => ({
    request: {
      promise: async (): Promise<IFetchStatsResponseData> => {
        const sdk = await BinanceSDK.getInstance();

        const [
          aBNBbBalance,
          bnbBalance,
          minimumStake,
          pendingUnstakes,
          relayerFee,
          aBNBcRatio,
          aBNBcBalance,
        ] = await Promise.all([
          sdk.getABNBBBalance(),
          sdk.getBNBBalance(),
          sdk.getMinimumStake(),
          sdk.getPendingUnstakes(),
          sdk.getRelayerFee(),
          ...(featuresConfig.stakeAbnbc
            ? [sdk.getABNBCRatio(), sdk.getABNBCBalance()]
            : []),
        ]);

        return {
          aBNBbBalance,
          aBNBcBalance,
          bnbBalance,
          minimumStake: minimumStake.plus(relayerFee),
          minAbnbbUnstake: minimumStake,
          minAbnbcUnstake: minimumStake.multipliedBy(aBNBcRatio),
          pendingUnstakes,
          relayerFee,
          aBNBcRatio,
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
