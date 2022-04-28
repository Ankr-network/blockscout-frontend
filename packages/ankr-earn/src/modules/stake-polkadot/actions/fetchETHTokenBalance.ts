import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { withStore } from 'modules/common/utils/withStore';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';
import { EPolkadotNetworks } from '../types';
import { getPolkadotRequestKey } from '../utils/getPolkadotRequestKey';

export const fetchETHTokenBalance = createSmartAction<
  RequestAction<BigNumber, BigNumber>,
  [EPolkadotNetworks]
>('polkadot/fetchETHTokenBalance', network => ({
  request: {
    promise: async (): Promise<BigNumber> => {
      const sdk = await PolkadotStakeSDK.getInstance();

      return sdk.getETHTokenBalance(network);
    },
  },
  meta: {
    asMutation: false,
    onRequest: withStore,
    requestKey: getPolkadotRequestKey(network),
  },
}));
