import { RequestAction, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { withStore } from 'modules/common/utils/withStore';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { PolygonSDK } from '../api/PolygonSDK';

interface IFetchStatsResponseData {
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
    promise: async (store: RequestsStore) => {
      const sdk = await PolygonSDK.getInstance();
      const { unstakeFee } = await sdk.getUnstakeFee();

      return {
        maticBalance: await sdk.getMaticBalance(),
        aMaticbBalance: await sdk.getaMaticbBalance(),
        minimumStake: await sdk.getMinimumStake(),
        unstakeFee: new BigNumber(Web3.utils.fromWei(unstakeFee)),
        pendingClaim: await sdk.getPendingClaim(),
      } as IFetchStatsResponseData;
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
    getData: data => data,
  },
}));
