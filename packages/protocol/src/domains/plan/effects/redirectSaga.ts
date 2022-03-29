import { success } from '@redux-requests/core';
import { put, select, takeEvery } from 'redux-saga/effects';
import { replace } from 'connected-react-router';

import { disconnect as disconnectAction } from 'modules/auth/actions/disconnect';
import { PATH_PLAN, PlanRoutesConfig } from '../Routes';

function* redirect() {
  const pathname: string = yield select(
    (state: any): string => state.router.location.pathname,
  );

  if (pathname.includes(PATH_PLAN) && pathname !== PATH_PLAN) {
    yield put(replace(PlanRoutesConfig.plan.path));
  }
}

export function* redirectSaga() {
  yield takeEvery(success(disconnectAction.toString()), redirect);
}
