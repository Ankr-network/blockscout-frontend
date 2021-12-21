import { RequestAction, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { withStore } from 'modules/common/utils/withStore';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { PolygonSDK } from '../api/PolygonSDK';
import { POLYGON_PROVIDER_ID } from '../const';
import { getUnstakeFee } from './getUnstakeFee';

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
      const providerManager = ProviderManagerSingleton.getInstance();
      const provider = await providerManager.getProvider(POLYGON_PROVIDER_ID);
      const currentAccount = provider.getCurrentAccount();

      const { data: unstakeFee } = await store.dispatchRequest(
        getUnstakeFee(currentAccount),
      );

      if (!unstakeFee) {
        throw new Error('Failed to get unstake fee data');
      }

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
