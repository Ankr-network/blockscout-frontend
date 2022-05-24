import { fork, ForkEffect } from 'redux-saga/effects';

import { polkadotSlotAuctionSaga } from 'modules/polkadot-slot-auction/sagas/polkadotSlotAuctionSaga';

import { providerEventsSaga } from './providerEventsSaga';

export function* rootSagas(): Generator<ForkEffect, void> {
  yield fork(polkadotSlotAuctionSaga);
  yield fork(providerEventsSaga);
}
