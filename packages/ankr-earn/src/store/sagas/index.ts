import { fork, ForkEffect } from 'redux-saga/effects';

import { polkadotSlotAuctionSaga } from 'modules/polkadot-slot-auction/sagas/polkadotSlotAuctionSaga';

import { notificationSaga } from './notificationSaga';
import { providerEventsSaga } from './providerEventsSaga';

export function* rootSagas(): Generator<ForkEffect, void> {
  yield fork(notificationSaga);
  yield fork(polkadotSlotAuctionSaga);
  yield fork(providerEventsSaga);
}
