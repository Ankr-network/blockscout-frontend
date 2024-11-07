import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { TNotificationID } from '../types';
import { selectPaginationNotifications } from '../actions/fetchPaginationNotifications';

export const selectPaginationNotificationById = createSelector(
  selectPaginationNotifications,
  (_state: RootState, id: TNotificationID) => id,
  ({ notifications }, id) =>
    notifications.find(notification => notification.id === id),
);
