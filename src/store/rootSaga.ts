import { fork } from 'redux-saga/effects';

import { notificationSaga } from '../domains/notification/effects/notificationSaga';

export function* rootSaga() {
  yield fork(notificationSaga);
}
