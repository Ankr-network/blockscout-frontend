import { success } from '@redux-requests/core';
import { Task } from 'redux-saga';
import { put, call, cancel, fork, takeEvery } from 'redux-saga/effects';

import { providerEventsSaga } from '@ankr.com/provider';
import { connect } from 'domains/auth/actions/connect';
import { disconnect } from 'domains/auth/actions/disconnect';
import { notificationSaga } from 'domains/notification/effects/notificationSaga';
import { MultiService } from 'modules/api/MultiService';
import { MultiRpcWeb3Sdk } from 'multirpc-sdk';
import { checkTheFirstCardPayment } from 'domains/account/actions/usdTopUp/checkTheFirstCardPayment';
import { autoLogin } from 'domains/oauth/actions/autoLogin';
import { loginUser } from 'domains/oauth/actions/loginUserByGoogleSecretCode';

function* checkTheFirstCardPaymentSaga() {
  yield put(checkTheFirstCardPayment());
}

export function* rootSaga() {
  yield fork(notificationSaga);

  let eventSaga: Task | undefined;

  function* updateServiceSaga() {
    if (eventSaga) yield cancel(eventSaga);

    const service: MultiRpcWeb3Sdk = yield call(MultiService.getWeb3Service);

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
  yield takeEvery(success(connect.toString()), checkTheFirstCardPaymentSaga);
  yield takeEvery(success(loginUser.toString()), checkTheFirstCardPaymentSaga);
  yield takeEvery(success(autoLogin.toString()), checkTheFirstCardPaymentSaga);
}
