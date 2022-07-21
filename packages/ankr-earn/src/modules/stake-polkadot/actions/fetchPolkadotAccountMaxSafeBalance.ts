import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';
import { EPolkadotNetworks } from '../types';
import { getPolkadotRequestKey } from '../utils/getPolkadotRequestKey';

export const fetchPolkadotAccountMaxSafeBalance = createAction<
  RequestAction<BigNumber, BigNumber>,
  [EPolkadotNetworks]
>('polkadot/fetchPolkadotAccountMaxSafeBalance', network => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await PolkadotStakeSDK.getInstance();

      return sdk.getPolkadotAccountMaxSafeBalance(network);
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    requestKey: getPolkadotRequestKey(network),
  },
}));
