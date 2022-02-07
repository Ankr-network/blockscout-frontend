import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { withStore } from 'modules/common/utils/withStore';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { BinanceSDK } from '../api/BinanceSDK';

interface IFetchStatsResponseData {
  bnbBalance: BigNumber;
  aBNBbBalance: BigNumber;
  minimumStake: BigNumber;
  unstakeFee: BigNumber;
  pendingClaim: BigNumber;
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
          bnbBalance,
          aBNBbBalance,
          minimumStake,
          { unstakeFee },
          pendingClaim,
          relayerFee,
        ] = await Promise.all([
          sdk.getBNBBalance(),
          sdk.getaBNBbBalance(),
          sdk.getMinimumStake(),
          sdk.getUnstakeFee(),
          sdk.getPendingClaim(),
          sdk.getRelayerFee(),
        ]);

        return {
          bnbBalance,
          aBNBbBalance,
          minimumStake,
          unstakeFee: new BigNumber(Web3.utils.fromWei(unstakeFee)),
          pendingClaim,
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
