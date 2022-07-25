import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';

interface IFetchStakeStatsData {
  maxPolkadotNetworkDecimals: BigNumber;
  minStake: BigNumber;
  polkadotNetworkMinSafeDepositVal: BigNumber;
}

export const fetchStakeStats = createSmartAction<
  RequestAction<IFetchStakeStatsData, IFetchStakeStatsData>
>('polkadot/fetchStakeStats', () => ({
  request: {
    promise: async (): Promise<IFetchStakeStatsData> => {
      const sdk = await PolkadotStakeSDK.getInstance();

      const [
        maxPolkadotNetworkDecimals,
        minStake,
        polkadotNetworkMinSafeDepositVal,
      ] = await Promise.all([
        sdk.getMaxPolkadotNetworkDecimals(),
        sdk.getMinStake(),
        sdk.getPolkadotNetworkMinSafeDepositVal(),
      ]);

      return {
        maxPolkadotNetworkDecimals,
        minStake,
        polkadotNetworkMinSafeDepositVal,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
  },
}));
