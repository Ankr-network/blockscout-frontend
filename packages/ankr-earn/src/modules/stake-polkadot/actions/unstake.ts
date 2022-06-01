import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TPolkadotAddress } from 'polkadot';

import { TStore } from 'modules/common/types/ReduxRequests';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';
import { EPolkadotNetworks } from '../types';

import { fetchTxHistory } from './fetchTxHistory';
import { fetchUnstakeStats } from './fetchUnstakeStats';

interface IRes {
  data: void;
}

export const unstake = createSmartAction<
  RequestAction<void, void>,
  [EPolkadotNetworks, TPolkadotAddress, BigNumber]
>('polkadot/unstake', (network, address, amount) => ({
  request: {
    promise: (async (): Promise<void> => {
      const sdk = await PolkadotStakeSDK.getInstance();

      return sdk.unstake(address, amount);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    onSuccess: (
      response: IRes,
      _action: RequestAction,
      store: TStore<IStoreState>,
    ): IRes => {
      store.dispatchRequest(fetchUnstakeStats());
      store.dispatchRequest(fetchTxHistory(network));
      store.dispatchRequest(getUnstakeDate());

      return response;
    },
  },
}));
