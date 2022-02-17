import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { withStore } from 'modules/common/utils/withStore';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { BinanceSDK } from '../api/BinanceSDK';

interface IFetchStatsResponseData {
  aBNBbBalance: BigNumber;
  bnbBalance: BigNumber;
  minimumStake: BigNumber;
  minimumUnstake: BigNumber;
  pendingUnstakes: BigNumber;
  relayerFee: BigNumber;
}

export const fetchStats = createSmartAction<
  RequestAction<IFetchStatsResponseData, IFetchStatsResponseData>
>(
  'bnb/fetchStats',
  (): RequestAction => ({
    request: {
      promise: async (): Promise<IFetchStatsResponseData> => {
        const sdk: BinanceSDK = await BinanceSDK.getInstance();

        const [
          aBNBbBalance,
          bnbBalance,
          minimumStake,
          pendingUnstakes,
          relayerFee,
        ] = await Promise.all([
          sdk.getABNBBBalance(),
          sdk.getBNBBalance(),
          sdk.getMinimumStake(),
          sdk.getPendingUnstakes(),
          sdk.getRelayerFee(),
        ]);

        return {
          aBNBbBalance,
          bnbBalance,
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
