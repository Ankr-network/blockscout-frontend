import { fork } from 'redux-saga/effects';

import { notificationSaga } from '../modules/notification/effects/notificationSaga';

export function* rootSaga() {
  yield fork(notificationSaga);
}
