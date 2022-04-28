import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';

interface IFetchStatsResponseData {
  ethTokenBalance: BigNumber;
  maxDecimalsUnstake: BigNumber;
  minStake: BigNumber;
}

export const fetchStats = createSmartAction<
  RequestAction<IFetchStatsResponseData, IFetchStatsResponseData>
>('polkadot/fetchStats', () => ({
  request: {
    promise: async (): Promise<IFetchStatsResponseData> => {
      const sdk = await PolkadotStakeSDK.getInstance();

      const [ethTokenBalance, maxDecimalsUnstake, minStake] = await Promise.all(
        [
          sdk.getETHTokenBalance(),
          sdk.getMaxDecimalsUnstake(),
          sdk.getMinStake(),
        ],
      );

      return {
        ethTokenBalance,
        maxDecimalsUnstake,
        minStake,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
  },
}));
