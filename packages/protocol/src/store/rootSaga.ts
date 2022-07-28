import { success } from '@redux-requests/core';
import { Task } from 'redux-saga';
import { call, cancel, fork, takeEvery } from 'redux-saga/effects';

import { providerEventsSaga } from '@ankr.com/provider';
import { connect } from 'domains/auth/actions/connect';
import { disconnect } from 'domains/auth/actions/disconnect';
import { notificationSaga } from 'domains/notification/effects/notificationSaga';
import { MultiService } from 'modules/api/MultiService';
import { MultiRpcSdk } from 'multirpc-sdk';

export function* rootSaga() {
  yield fork(notificationSaga);

  let eventSaga: Task | undefined;

  function* updateServiceSaga() {
    if (eventSaga) yield cancel(eventSaga);

    const service: MultiRpcSdk = yield call(MultiService.getInstance);

    eventSaga = yield fork(
      { context: null, fn: providerEventsSaga },
      {
        connectAction: connect.toString(),
        disconnectAction: disconnect.toString(),
        provider: service.getKeyProvider(),
        actions: {
          accountsChanged: disconnect,
          chainChanged: disconnect,
          disconnect,
        },
      },
    );
  }

  yield takeEvery(success(connect.toString()), updateServiceSaga);
}
