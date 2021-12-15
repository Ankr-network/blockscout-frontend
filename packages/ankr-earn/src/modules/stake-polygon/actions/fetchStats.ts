import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { PolygonSDK } from '../api/PolygonSDK';
import Web3 from 'web3';

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
    promise: (async () => {
      const sdk = PolygonSDK.getInstance();
      return {
        maticBalance: await sdk.getMaticBalance(),
        aMaticbBalance: await sdk.getaMaticbBalance(),
        minimumStake: await sdk.getMinimumStake(),
        unstakeFee: new BigNumber(
          Web3.utils.fromWei((await sdk.getUnstakeFee()).unstakeFee),
        ),
        pendingClaim: await sdk.getPendingClaim(),
      } as IFetchStatsResponseData;
    })(),
  },
  meta: {
    asMutation: false,
    getData: data => data,
  },
}));
