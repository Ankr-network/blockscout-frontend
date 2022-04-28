import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { SwitcherSDK } from '../api/SwitcherSDK';
import { AvailableSwitcherToken, AvailableSwitchNetwork } from '../const';

interface IAddTokenToWalletArgs {
  chainId: AvailableSwitchNetwork;
  swapOption: AvailableSwitcherToken;
}

export const addSwitcherTokenToWallet = createAction<
  RequestAction<boolean, boolean>,
  [IAddTokenToWalletArgs]
>(
  'switcher/addSwitcherTokenToWallet',
  ({ chainId, swapOption }: IAddTokenToWalletArgs) => ({
    request: {
      promise: async (): Promise<boolean> => {
        const sdk = await SwitcherSDK.getInstance();

        return sdk.addTokenToWallet({ chainId, token: swapOption });
      },
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      onRequest: withStore,
    },
  }),
);
