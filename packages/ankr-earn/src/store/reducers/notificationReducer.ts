import { SnackbarProps } from '@material-ui/core/Snackbar';
import { Color } from '@material-ui/lab';

import { createReducer } from 'modules/common/utils/redux/createReducer';

import { NotificationActionsTypes } from '../actions/NotificationActions';

export interface INotificationProps extends SnackbarProps {
  severity: Color;
}

export interface INotificationState {
  queue: INotificationProps[];
}

const initialState: INotificationState = {
  queue: [],
};

export const notificationReducer = createReducer(initialState, {
  [NotificationActionsTypes.PUSH_NOTIFICATION_TO_THE_QUEUE]: (
    state: INotificationState,
    action: {
      payload: INotificationProps;
    },
  ): INotificationState => {
    const queue = state.queue.filter(item => item.key !== action.payload.key);
    return {
      ...state,
      queue: [...queue, action.payload],
    };
  },
  [NotificationActionsTypes.HIDE_NOTIFICATION]: (
    state: INotificationState,
    action: { payload: string },
  ): INotificationState => ({
    ...state,
    queue: state.queue.filter(item => item.key !== action.payload),
  }),
});
