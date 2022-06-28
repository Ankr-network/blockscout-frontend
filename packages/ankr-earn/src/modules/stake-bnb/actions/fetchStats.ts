import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { BinanceSDK } from '../api/BinanceSDK';

interface IFetchStatsResponseData {
  aBNBbBalance: BigNumber;
  aBNBcBalance: BigNumber;
  bnbBalance: BigNumber;
  minStake: BigNumber;
  minAbnbbUnstake: BigNumber;
  minAbnbcUnstake: BigNumber;
  relayerFee: BigNumber;
  aBNBcRatio: BigNumber;
  aETHBalance: BigNumber;
  aETHRatio: BigNumber;
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
          relayerFee,
          aBNBcRatio,
          aBNBcBalance,
          aETHBalance,
          aETHRatio,
        ] = await Promise.all([
          sdk.getABBalance(),
          sdk.getBNBBalance(),
          sdk.getMinimumStake(),
          sdk.getRelayerFee(),
          sdk.getACRatio(),
          sdk.getACBalance(),
          sdk.getAETHBalance(),
          sdk.getAETHRatio(),
        ]);

        return {
          aBNBbBalance,
          aBNBcBalance,
          bnbBalance,
          relayerFee,
          aBNBcRatio,
          aETHBalance,
          aETHRatio,
          minStake: minimumStake,
          minAbnbbUnstake: minimumStake,
          minAbnbcUnstake: minimumStake.multipliedBy(aBNBcRatio),
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
