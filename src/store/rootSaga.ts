import { fork } from 'redux-saga/effects';
import { web3EventsSaga } from '@ankr.com/dom';

import { notificationSaga } from 'domains/notification/effects/notificationSaga';
import { connect } from 'modules/auth/actions/connect';
import { disconnect } from 'modules/auth/actions/disconnect';
import { MultiService } from 'modules/api/MultiService';

export function* rootSaga() {
  const { service } = MultiService.getInstance();

  yield fork(notificationSaga);
  yield fork(
    { context: null, fn: web3EventsSaga },
    {
      connectAction: connect.toString(),
      disconnectAction: disconnect.toString(),
      web3KeyProvider: service.getKeyProvider(),
      web3Actions: {
        accountsChanged: disconnect,
        chainChanged: disconnect,
        disconnect,
      },
    },
  );
}
