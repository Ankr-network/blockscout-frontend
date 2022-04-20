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
  minStake: BigNumber;
  minAbnbbUnstake: BigNumber;
  minAbnbcUnstake: BigNumber;
  pendingAbnbbUnstakes: BigNumber;
  pendingAbnbcUnstakes: BigNumber;
  relayerFee: BigNumber;
  aBNBcRatio: BigNumber;
}

// TODO: change pendingUnstakes to separate numbers for bond and cert.
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
          { pendingABNBB, pendingABNBC },
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
          minStake: minimumStake,
          minAbnbbUnstake: minimumStake,
          minAbnbcUnstake: minimumStake.multipliedBy(aBNBcRatio),
          pendingAbnbbUnstakes: pendingABNBB,
          pendingAbnbcUnstakes: pendingABNBC,
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
