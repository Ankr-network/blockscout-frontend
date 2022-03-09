import { createAction } from 'redux-smart-actions';

import { ISlotAuctionConfig } from 'polkadot';

import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';

export const initialize = createAction(
  'INITIALIZE_SLOT_AUCTION_SDK',
  (config: ISlotAuctionConfig) => ({
    request: {
      promise: (async () => {
        return SlotAuctionSdkSingleton.getInstance(config);
      })(),
    },
    meta: {
      asMutation: false,
    },
  }),
);
