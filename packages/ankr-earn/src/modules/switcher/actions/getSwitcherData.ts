import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { EthSDK } from 'modules/api/EthSDK';
import { withStore } from 'modules/common/utils/withStore';

export interface IGetSwitcherData {
  ratio: BigNumber;
  aETHbBalance: BigNumber;
  aETHcBalance: BigNumber;
  allowance: BigNumber;
}

export const getSwitcherData = createAction<
  RequestAction<IGetSwitcherData, IGetSwitcherData>
>('switcher/getSwitcherData', () => ({
  request: {
    promise: async (): Promise<IGetSwitcherData> => {
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
    showNotificationOnError: false,
    onRequest: withStore,
  },
}));
