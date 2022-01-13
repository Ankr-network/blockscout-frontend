import { polkadotSlotAuctionSaga } from 'modules/polkadot-slot-auction/sagas/polkadotSlotAuctionSaga';
import { fork } from 'redux-saga/effects';
import { notificationSaga } from './notificationSaga';
import { providerEventsSaga } from './providerEventsSaga';

export function* rootSagas() {
  yield fork(notificationSaga);
  yield fork(polkadotSlotAuctionSaga);
  yield fork(providerEventsSaga);
}
