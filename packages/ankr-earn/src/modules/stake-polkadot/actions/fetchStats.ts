import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';

interface IFetchStatsResponseData {
  ethTokenBalance: BigNumber;
  minimumStake: BigNumber;
  pendingUnstakes: BigNumber;
  polkadotTokenBalance: BigNumber;
}

export const fetchStats = createSmartAction<
  RequestAction<IFetchStatsResponseData, IFetchStatsResponseData>
>(
  'polkadot/fetchStats',
  (): RequestAction => ({
    request: {
      promise: async (): Promise<IFetchStatsResponseData> => {
        const sdk = await PolkadotStakeSDK.getInstance();

        const [
          ethTokenBalance,
          minimumStake,
          pendingUnstakes,
          polkadotTokenBalance,
        ] = await Promise.all([
          sdk.getETHTokenBalance(),
          sdk.getMinimumStake(),
          sdk.getPendingUnstakes(),
          sdk.getPolkadotTokenBalance(),
        ]);

        return {
          ethTokenBalance,
          minimumStake,
          pendingUnstakes,
          polkadotTokenBalance,
        };
      },
    },
    meta: {
      asMutation: false,
      getData: (data: IFetchStatsResponseData): IFetchStatsResponseData => data,
      onRequest: withStore,
    },
  }),
);
