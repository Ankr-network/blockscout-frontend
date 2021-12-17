import { TNetworkType } from '@ankr.com/stakefi-polkadot';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { NotificationActions } from 'store/actions/NotificationActions';
import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';
import { fetchCrowdloanBalances } from './fetchCrowdloanBalances';
import { fetchPolkadotAccounts } from './fetchPolkadotAccounts';
import { fetchPolkadotBalance } from './fetchPolkadotBalance';

interface IConnect {
  polkadotAccount: string;
  networkType: TNetworkType;
  isConnected: boolean;
}

export const connect = createAction<RequestAction<IConnect, IConnect>>(
  'CONNECT_SLOT_AUCTION_SDK',
  (selectedPolkadotAccount?: string) => ({
    request: {
      promise: (async function () {
        const slotAuctionSdk = SlotAuctionSdkSingleton.getInstance();

        if (!slotAuctionSdk.isConnected()) {
          await slotAuctionSdk.connect();
        }
        const accounts = await slotAuctionSdk.getPolkadotAccounts();
        const selectedAccountIndex = accounts.indexOf(
          selectedPolkadotAccount ?? '',
        );
        const polkadotAccount =
          accounts[selectedAccountIndex === -1 ? 0 : selectedAccountIndex];
        const isConnected = slotAuctionSdk.isConnected();
        const networkType = await slotAuctionSdk
          .getPolkadotProvider()
          .getNetworkType();
        return {
          polkadotAccount,
          networkType,
          isConnected,
        };
      })(),
    },
    meta: {
      asMutation: false,
      onSuccess: (response, action, store) => {
        store.dispatchRequest(fetchPolkadotAccounts());

        store.dispatchRequest(
          fetchPolkadotBalance(response.data.polkadotAccount),
        );

        store.dispatchRequest(
          fetchCrowdloanBalances(response.data.polkadotAccount),
        );

        return response;
      },
      onError: (error, action, store) => {
        store.dispatch(
          NotificationActions.showNotification({
            message: error.toString(),
            severity: 'error',
          }),
        );
        throw error;
      },
    },
  }),
);
