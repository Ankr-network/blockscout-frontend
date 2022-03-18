import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { EthSDK } from 'modules/api/EthSDK';
import { withStore } from 'modules/common/utils/withStore';

export interface IGetEth2SwapData {
  ratio: BigNumber;
  aETHbBalance: BigNumber;
  aETHcBalance: BigNumber;
  allowance: BigNumber;
}

export const getEth2SwapData = createAction<
  RequestAction<IGetEth2SwapData, IGetEth2SwapData>
>('eth2-swap/getEth2SwapData', () => ({
  request: {
    promise: async (): Promise<IGetEth2SwapData> => {
      const sdk = await EthSDK.getInstance();

      const [aETHcBalance, aETHbBalance, ratio, allowance] = await Promise.all([
        sdk.getAethcBalance(),
        sdk.getAethbBalance(),
        sdk.getAethcRatio(),
        sdk.getAllowance(),
      ]);

      return {
        ratio,
        aETHcBalance,
        aETHbBalance,
        allowance,
      };
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));
