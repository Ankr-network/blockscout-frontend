import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';

interface IFetchUnstakeStatsData {
  ethTokenBalance: BigNumber;
  maxDecimalsUnstake: BigNumber;
}

export const fetchUnstakeStats = createSmartAction<
  RequestAction<IFetchUnstakeStatsData, IFetchUnstakeStatsData>
>('polkadot/fetchUnstakeStats', () => ({
  request: {
    promise: async (): Promise<IFetchUnstakeStatsData> => {
      const sdk = await PolkadotStakeSDK.getInstance();

      const [ethTokenBalance, maxDecimalsUnstake] = await Promise.all([
        sdk.getETHTokenBalance(),
        sdk.getMaxDecimalsUnstake(),
      ]);

      return {
        ethTokenBalance,
        maxDecimalsUnstake,
      };
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
  },
}));
