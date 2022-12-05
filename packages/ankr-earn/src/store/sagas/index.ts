import { fork, ForkEffect } from 'redux-saga/effects';

import { polkadotSlotAuctionSaga } from 'modules/polkadot-slot-auction/sagas/polkadotSlotAuctionSaga';

export function* rootSagas(): Generator<ForkEffect, void> {
  yield fork(polkadotSlotAuctionSaga);
}
