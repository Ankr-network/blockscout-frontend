import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';
import { EPolkadotNetworks } from '../types';

export const addETHTokenToWallet = createAction<
  RequestAction<void, void>,
  [EPolkadotNetworks]
>('polkadot/addETHTokenToWallet', (currNetwork: EPolkadotNetworks) => ({
  request: {
    promise: (async (): Promise<void> => {
      const sdk = await PolkadotStakeSDK.getInstance();

      return sdk.addETHTokenToWallet(currNetwork);
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
  },
}));
