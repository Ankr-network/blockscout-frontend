import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';

import { withStore } from 'modules/common/utils/withStore';

import { PolygonSDK } from '../api/PolygonSDK';

export interface IFetchStatsResponseData {
  maticBalance: BigNumber;
  aMATICbBalance: BigNumber;
  aMATICcBalance: BigNumber;
  minimumStake: BigNumber;
  unstakeFee: BigNumber;
  pendingAMATICB: BigNumber;
  pendingAMATICC: BigNumber;
  aMATICcRatio: BigNumber;
}

export const fetchStats = createSmartAction<
  RequestAction<IFetchStatsResponseData, IFetchStatsResponseData>
>('polygon/fetchStats', () => ({
  request: {
    promise: async (): Promise<IFetchStatsResponseData> => {
      const sdk = await PolygonSDK.getInstance();
      const { unstakeFee } = await sdk.getUnstakeFee();

      const [
        maticBalance,
        aMATICbBalance,
        aMATICcBalance,
        minimumStake,
        { pendingAMATICB, pendingAMATICC },
        aMATICcRatio,
      ] = await Promise.all([
        sdk.getMaticBalance(),
        sdk.getABBalance(),
        sdk.getACBalance(),
        sdk.getMinimumStake(),
        sdk.getPendingData(),
        sdk.getACRatio(),
      ]);

      return {
        maticBalance,
        aMATICbBalance,
        aMATICcBalance,
        minimumStake,
        unstakeFee: new BigNumber(Web3.utils.fromWei(unstakeFee)),
        pendingAMATICB,
        pendingAMATICC,
        aMATICcRatio,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
    getData: data => data,
  },
}));
