import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { TStore } from 'modules/common/types/ReduxRequests';

import { PolkadotStakeSDK } from '../api/PolkadotStakeSDK';
import { EPolkadotNetworks } from '../types';

import { fetchStakeStats } from './fetchStakeStats';
import { fetchTxHistory } from './fetchTxHistory';

interface IClaimProps {
  amount: BigNumber;
  claimableAmount: BigNumber;
  isLedgerWallet?: boolean;
  network: EPolkadotNetworks;
}

interface IRes {
  data: void;
}

export const claim = createSmartAction<
  RequestAction<void, void>,
  [IClaimProps]
>(
  'polkadot/claim',
  ({ amount, claimableAmount, isLedgerWallet, network }): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {
        const sdk = await PolkadotStakeSDK.getInstance();

        return sdk.claim(network, amount, claimableAmount, isLedgerWallet);
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
        store.dispatchRequest(fetchStakeStats());
        store.dispatchRequest(fetchTxHistory(network));

        return response;
      },
    },
  }),
);
