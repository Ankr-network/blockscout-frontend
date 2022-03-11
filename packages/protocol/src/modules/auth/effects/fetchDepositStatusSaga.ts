import { success } from '@redux-requests/core';
import { put, takeEvery } from 'redux-saga/effects';
import { connect } from '../actions/connect';
import { fetchDepositStatus as fetchDepositStatusAction } from '../actions/fetchDepositStatus';

function* fetchDepositStatus() {
  yield put({ type: fetchDepositStatusAction.toString() });
}

export function* fetchDepositStatusSaga() {
  yield takeEvery(success(connect.toString()), fetchDepositStatus);
}
