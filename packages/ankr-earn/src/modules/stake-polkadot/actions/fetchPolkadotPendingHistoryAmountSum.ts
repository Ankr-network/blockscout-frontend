import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';
import { EPolkadotNetworks } from '../types';
import { getPolkadotRequestKey } from '../utils/getPolkadotRequestKey';

export const fetchPolkadotPendingHistoryAmountSum = createAction<
  RequestAction<BigNumber, BigNumber>,
  [EPolkadotNetworks]
>('polkadot/fetchPolkadotPendingHistoryAmountSum', network => ({
  request: {
    promise: (async (): Promise<BigNumber> => {
      const sdk = await PolkadotStakeSDK.getInstance();

      return sdk.getPolkadotPendingHistoryAmountSum(network);
    })(),
  },
  meta: {
    asMutation: false,
    requestKey: getPolkadotRequestKey(network),
  },
}));
