import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';

import { PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { withStore } from 'modules/common/utils/withStore';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';

export interface IFetchStakeStatsResponseData {
  minimumStake: BigNumber;
  unstakeFee: BigNumber;
}

export const fetchStakeStats = createSmartAction<
  RequestAction<IFetchStakeStatsResponseData, IFetchStakeStatsResponseData>
>(`${MATIC_ETH_ACTIONS_PREFIX}fetchStakeStats`, () => ({
  request: {
    promise: async (): Promise<IFetchStakeStatsResponseData> => {
      const sdk = await PolygonOnEthereumSDK.getInstance();
      const unstakeFee = await sdk.getUnstakeFee();

      const minimumStake = await sdk.getMinimumStake();

      return {
        minimumStake,
        unstakeFee: new BigNumber(Web3.utils.fromWei(unstakeFee)),
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
    showNotificationOnError: true,
  },
}));
