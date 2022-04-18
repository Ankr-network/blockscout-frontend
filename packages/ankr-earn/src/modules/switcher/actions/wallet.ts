import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult } from 'provider';

import { EthSDK, TEthToken } from 'modules/api/EthSDK';
import { withStore } from 'modules/common/utils/withStore';

export interface IAddTokenToWalletArgs {
  swapOption: TEthToken;
}

export const addSwitcherTokenToWallet = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [IAddTokenToWalletArgs]
>(
  'switcher/addSwitcherTokenToWallet',
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
