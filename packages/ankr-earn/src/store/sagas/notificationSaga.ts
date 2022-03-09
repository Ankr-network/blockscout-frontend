import { AnyAction } from 'redux';
import { Action } from 'redux-actions';
import { END, eventChannel } from 'redux-saga';
import { ForkEffect, put, race, take, takeEvery } from 'redux-saga/effects';

import {
  NotificationActions,
  NotificationActionsTypes,
} from '../actions/NotificationActions';
import { INotificationProps } from '../reducers/notificationReducer';

const EVM_REVERTED_TX_ERR = 'Error: Transaction has been reverted by the EVM';

function getErrMsg<T>(errMsg?: T): T | string {
  if (typeof errMsg !== 'string') {
    return errMsg as T;
  }

  if (errMsg.startsWith(EVM_REVERTED_TX_ERR)) {
    return EVM_REVERTED_TX_ERR;
  }

  return errMsg as string;
}

function* showNotification(action: Action<INotificationProps>) {
  const payload: INotificationProps = {
    ...action.payload,
    message: getErrMsg(action.payload?.message),
  };

  const channel = eventChannel(emitter => {
    const onClose = () => {
      emitter(true);
      emitter(END);
    };

    setImmediate(() => emitter(onClose));

    return () => null;
  });

  const handleClose: () => void = yield take(channel);

  const notification: INotificationProps = {
    ...payload,
    onClose: handleClose,
  };

  yield put(NotificationActions.pushNotificationToTheQueue(notification));

  try {
    yield race([
      take(channel),
      take(
        (filterAction: AnyAction) =>
          filterAction.type === NotificationActionsTypes.HIDE_NOTIFICATION &&
          notification.key === filterAction.payload,
      ),
    ]);
  } finally {
    yield put(NotificationActions.hideNotification(notification.key));
  }
}

export function* notificationSaga(): Generator<ForkEffect, void> {
  yield takeEvery(NotificationActionsTypes.SHOW_NOTIFICATION, showNotification);
}
