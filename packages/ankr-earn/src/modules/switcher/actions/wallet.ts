import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { EthSDK, TEthToken } from 'modules/api/EthSDK';
import { withStore } from 'modules/common/utils/withStore';

interface IAddTokenToWalletArgs {
  swapOption: TEthToken;
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
