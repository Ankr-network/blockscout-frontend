import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult } from 'provider';

import { EthSDK, TEthToken } from 'modules/api/EthSDK';
import { withStore } from 'modules/common/utils/withStore';

export interface IAddTokenToWalletArgs {
  swapOption: TEthToken;
}

export const addEth2SwapTokenToWallet = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [IAddTokenToWalletArgs]
>(
  'eth2-swap/addEth2SwapTokenToWallet',
  ({ swapOption }: IAddTokenToWalletArgs) => ({
    request: {
      promise: async (): Promise<void> => {
        const sdk = await EthSDK.getInstance();
        return sdk.addTokenToWallet({
          swapOption,
        });
      },
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      getData: data => data,
      onRequest: withStore,
    },
  }),
);
