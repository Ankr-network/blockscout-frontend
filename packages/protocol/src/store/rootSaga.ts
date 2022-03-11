import { fork } from 'redux-saga/effects';

import { notificationSaga } from 'domains/notification/effects/notificationSaga';
import { connect } from 'modules/auth/actions/connect';
import { disconnect } from 'modules/auth/actions/disconnect';
import { MultiService } from 'modules/api/MultiService';
import { providerEventsSaga } from 'provider';
import { fetchDepositStatusSaga } from 'modules/auth/effects/fetchDepositStatusSaga';

export function* rootSaga() {
  const { service } = MultiService.getInstance();

  yield fork(fetchDepositStatusSaga);
  yield fork(notificationSaga);
  yield fork(
    { context: null, fn: providerEventsSaga },
    {
      connectAction: connect.toString(),
      disconnectAction: disconnect.toString(),
      // @ts-ignore
      provider: service.getKeyProvider(),
      actions: {
        accountsChanged: disconnect,
        chainChanged: disconnect,
        disconnect,
      },
    },
  );
}
