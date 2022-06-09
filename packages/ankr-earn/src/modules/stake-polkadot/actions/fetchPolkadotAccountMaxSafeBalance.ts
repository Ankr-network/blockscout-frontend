import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';
import { EPolkadotNetworks } from '../types';
import { getPolkadotRequestKey } from '../utils/getPolkadotRequestKey';

interface IFetchPolkadotAccountMaxSafeBalanceProps {
  isExternalCall?: boolean;
  network: EPolkadotNetworks;
}

export const fetchPolkadotAccountMaxSafeBalance = createAction<
  RequestAction<BigNumber, BigNumber>,
  [IFetchPolkadotAccountMaxSafeBalanceProps]
>(
  'polkadot/fetchPolkadotAccountMaxSafeBalance',
  ({ isExternalCall, network }) => ({
    request: {
      promise: (async (): Promise<BigNumber> => {
        const sdk = await PolkadotStakeSDK.getInstance();

        return sdk.getPolkadotAccountMaxSafeBalance(network, isExternalCall);
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      requestKey: getPolkadotRequestKey(network),
    },
  }),
);
