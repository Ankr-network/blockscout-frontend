import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INotificationOptions } from '../hooks/useNotification';

export interface INotificationProps
  extends Pick<
    INotificationOptions,
    'variant' | 'autoHideDuration' | 'anchorOrigin'
  > {
  message: string;
}

interface IShowNotificationPayload extends INotificationProps {
  key?: string | number;
}

export type TNotificationsState = Record<string, INotificationProps>;

const initialState: TNotificationsState = {};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<IShowNotificationPayload>,
    ) => {
      const key = action.payload.key || new Date().getTime() + Math.random();
      state[key] = {
        ...action.payload,
      };
    },
    hideNotification: (state, action: PayloadAction<string | number>) => {
      delete state[action.payload];
    },
  },
});

const selectNotifications = (state: { notifications: TNotificationsState }) =>
  state.notifications;

export const selectNotificationsData = createSelector(
  selectNotifications,
  state => state,
);

export const {
  reducer: notificationsReducer,
  actions: { showNotification, hideNotification },
} = notificationsSlice;
