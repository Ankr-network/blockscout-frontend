import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { SlotAuctionSdk } from 'polkadot';

import { TStore } from 'modules/common/types/ReduxRequests';
import { IStoreState } from 'store/store';

import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';

import { fetchWeb3WalletData } from './fetchWeb3WalletData';

interface IReq {
  data: boolean;
}

export const connectGuardComponent = createAction<
  RequestAction<boolean, boolean>
>(
  'polkadotSlotAuction/connectGuardComponent',
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<boolean> => {
        const slotAuctionSdk: SlotAuctionSdk =
          await SlotAuctionSdkSingleton.getInstance();

        // Note: This is an external method for calling the "connectFromInjected()" in a "safe" mode
        await slotAuctionSdk.getEthereumAccount();

        return slotAuctionSdk.isConnected();
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      getData: (data: boolean): boolean => data,
      onSuccess: (
        request: IReq,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ): IReq => {
        store.dispatchRequest(fetchWeb3WalletData());

        return request;
      },
    },
  }),
);
