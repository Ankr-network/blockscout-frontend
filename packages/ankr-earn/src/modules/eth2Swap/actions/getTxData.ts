import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { EthSDK } from '../api/sdk';

export interface IGetEth2SwapData {
  amount: BigNumber;
  destinationAddress?: string;
}

export const getTxData = createAction<
  RequestAction<IGetEth2SwapData, IGetEth2SwapData>
>('eth2-swap/getTxData', ({ txHash }: { txHash: string }) => ({
  request: {
    promise: async (): Promise<IGetEth2SwapData> => {
      const sdk = await EthSDK.getInstance();

      return sdk.fetchTxData(txHash);
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    onRequest: withStore,
  },
}));
