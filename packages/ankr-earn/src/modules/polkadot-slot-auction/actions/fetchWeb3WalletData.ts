import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';

interface IFetchWeb3WalletData {
  chainId: number;
  isConnected: boolean;
}

export const fetchWeb3WalletData = createAction<
  RequestAction<IFetchWeb3WalletData, IFetchWeb3WalletData>
>(
  'polkadotSlotAuction/fetchWeb3WalletData',
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<IFetchWeb3WalletData> => {
        const slotAuctionSdk: SlotAuctionSdk = SlotAuctionSdkSingleton.getInstance();

        const isConnected: boolean = slotAuctionSdk
          .getKeyProvider()
          .isConnected();
        const chainId: number = await slotAuctionSdk
          .getKeyProvider()
          .getWeb3()
          .eth.getChainId();

        return {
          chainId,
          isConnected,
        };
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      getData: (data: IFetchWeb3WalletData): IFetchWeb3WalletData => data,
    },
  }),
);
