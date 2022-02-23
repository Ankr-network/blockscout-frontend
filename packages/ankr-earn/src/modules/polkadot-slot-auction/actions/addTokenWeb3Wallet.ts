import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { SlotAuctionSdk } from 'polkadot';

import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';

interface IAddTokenWeb3WalletProps {
  isBondToken?: boolean;
  loanId: number;
}

export const addTokenWeb3Wallet = createAction<RequestAction<void, void>>(
  'polkadotSlotAuction/addTokenWeb3Wallet',
  ({
    isBondToken = true,
    loanId,
  }: IAddTokenWeb3WalletProps): RequestAction => ({
    request: {
      promise: (async (): Promise<void> => {
        const slotAuctionSdk: SlotAuctionSdk =
          await SlotAuctionSdkSingleton.getInstance();

        await slotAuctionSdk.addCrowdloanAssetsToMetaMask(loanId, isBondToken);
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
    },
  }),
);
