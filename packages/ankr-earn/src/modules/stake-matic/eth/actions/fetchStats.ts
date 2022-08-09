import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';

import { MaticEthSDK } from '@ankr.com/staking-sdk';

import { withStore } from 'modules/common/utils/withStore';

export interface IFetchStatsResponseData {
  maticBalance: BigNumber;
  aMATICbBalance: BigNumber;
  aMATICcBalance: BigNumber;
  minimumStake: BigNumber;
  unstakeFee: BigNumber;
  pendingBond: BigNumber;
  pendingCertificate: BigNumber;
  aMATICcRatio: BigNumber;
}

export const fetchStats = createSmartAction<
  RequestAction<IFetchStatsResponseData, IFetchStatsResponseData>
>('polygon/fetchStats', () => ({
  request: {
    promise: async (): Promise<IFetchStatsResponseData> => {
      const sdk = await MaticEthSDK.getInstance();
      const { unstakeFee } = await sdk.getUnstakeFee();

      const [
        maticBalance,
        aMATICbBalance,
        aMATICcBalance,
        minimumStake,
        { pendingBond, pendingCertificate },
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
        pendingBond,
        pendingCertificate,
        aMATICcRatio,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
  },
}));
