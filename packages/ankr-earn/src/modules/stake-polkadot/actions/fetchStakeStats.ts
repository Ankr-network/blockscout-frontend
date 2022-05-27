import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';

interface IFetchStakeStatsData {
  maxDecimalsStake: BigNumber;
  minStake: BigNumber;
}

export const fetchStakeStats = createSmartAction<
  RequestAction<IFetchStakeStatsData, IFetchStakeStatsData>
>('polkadot/fetchStakeStats', () => ({
  request: {
    promise: async (): Promise<IFetchStakeStatsData> => {
      const sdk = await PolkadotStakeSDK.getInstance();

      const [maxDecimalsStake, minStake] = await Promise.all([
        sdk.getMaxDecimalsStake(),
        sdk.getMinStake(),
      ]);

      return {
        maxDecimalsStake,
        minStake,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
  },
}));
