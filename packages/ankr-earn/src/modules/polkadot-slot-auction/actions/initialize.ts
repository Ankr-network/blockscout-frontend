import { ISlotAuctionConfig } from '@ankr.com/stakefi-polkadot/dist/types/config';
import { createAction } from 'redux-smart-actions';
import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';

export const initialize = createAction(
  'INITIALIZE_SLOT_AUCTION_SDK',
  (config: ISlotAuctionConfig) => ({
    request: {
      promise: (async function () {
        return SlotAuctionSdkSingleton.getInstance(config);
      })(),
    },
    meta: {
      asMutation: false,
    },
  }),
);
