import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { EthSDK } from 'modules/api/EthSDK';
import { Token } from 'modules/common/types/token';
import { withStore } from 'modules/common/utils/withStore';

interface IAddTokenToWalletArgs {
  swapOption: Token;
}

export const addSwitcherTokenToWallet = createAction<
  RequestAction<boolean, boolean>,
  [IAddTokenToWalletArgs]
>(
  'switcher/addSwitcherTokenToWallet',
  ({ swapOption }: IAddTokenToWalletArgs) => ({
    request: {
      promise: async (): Promise<boolean> => {
        const sdk = await EthSDK.getInstance();
        return sdk.addTokenToWallet(swapOption);
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
