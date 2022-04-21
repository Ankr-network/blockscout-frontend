import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';

import { withStore } from 'modules/common/utils/withStore';

import { PolygonSDK } from '../api/PolygonSDK';

export interface IFetchStatsResponseData {
  maticBalance: BigNumber;
  aMaticbBalance: BigNumber;
  minimumStake: BigNumber;
  unstakeFee: BigNumber;
  pendingClaim: BigNumber;
}

export const fetchStats = createSmartAction<
  RequestAction<IFetchStatsResponseData, IFetchStatsResponseData>
>('polygon/fetchStats', () => ({
  request: {
    promise: async (): Promise<IFetchStatsResponseData> => {
      const sdk = await PolygonSDK.getInstance();
      const { unstakeFee } = await sdk.getUnstakeFee();

      const [maticBalance, aMaticbBalance, minimumStake, pendingClaim] =
        await Promise.all([
          sdk.getMaticBalance(),
          sdk.getABBalance(),
          sdk.getMinimumStake(),
          sdk.getPendingClaim(),
        ]);

      return {
        maticBalance,
        aMaticbBalance,
        minimumStake,
        unstakeFee: new BigNumber(Web3.utils.fromWei(unstakeFee)),
        pendingClaim,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
    getData: data => data,
  },
}));
