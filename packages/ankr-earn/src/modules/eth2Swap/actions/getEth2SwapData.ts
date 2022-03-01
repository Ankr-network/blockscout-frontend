import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { EthSDK } from '../api/sdk';

export interface IGetEth2SwapData {
  ratio: BigNumber;
  fethBalance: BigNumber;
  aethBalance: BigNumber;
  allowance: BigNumber;
}

export const getEth2SwapData = createAction<
  RequestAction<IGetEth2SwapData, IGetEth2SwapData>
>('eth2-swap/getEth2SwapData', () => ({
  request: {
    promise: async (): Promise<IGetEth2SwapData> => {
      const sdk = await EthSDK.getInstance();

      return sdk.fetchEth2SwapData();
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));
