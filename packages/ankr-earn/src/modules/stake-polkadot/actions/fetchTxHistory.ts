import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import {
  ITxEventsHistoryData,
  PolkadotStakeSDK,
} from '../api/PolkadotStakeSDK';
import { EPolkadotNetworks } from '../types';
import { getPolkadotRequestKey } from '../utils/getPolkadotRequestKey';

export const fetchTxHistory = createSmartAction<
  RequestAction<ITxEventsHistoryData, ITxEventsHistoryData>,
  [EPolkadotNetworks]
>('polkadot/fetchTxHistory', network => ({
  request: {
    promise: (async (): Promise<ITxEventsHistoryData> => {
      const sdk = await PolkadotStakeSDK.getInstance();

      return sdk.getTxEventsHistory(network);
    })(),
  },
  meta: {
    asMutation: false,
    requestKey: getPolkadotRequestKey(network),
  },
}));
