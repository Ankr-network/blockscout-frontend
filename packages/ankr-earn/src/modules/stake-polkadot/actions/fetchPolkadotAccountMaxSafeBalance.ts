import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';
import { EPolkadotNetworks } from '../types';

export const fetchPolkadotAccountMaxSafeBalance = createAction<
  RequestAction<BigNumber, BigNumber>,
  [EPolkadotNetworks]
>('polkadot/fetchPolkadotAccountMaxSafeBalance', currNetwork => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await PolkadotStakeSDK.getInstance();

      return sdk.getPolkadotAccountMaxSafeBalance(currNetwork);
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
  },
}));
