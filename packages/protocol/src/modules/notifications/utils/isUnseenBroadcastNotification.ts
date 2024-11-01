import { INotificationItem } from 'multirpc-sdk';

import { EMilliSeconds } from 'modules/common/constants/const';

import { getNotificationAge } from './getNotificationAge';
import { isBroadcastNotification } from './isBroadcastNotification';

export const isUnseenBroadcastNotification = (
  notification: INotificationItem,
) =>
  isBroadcastNotification(notification) &&
  getNotificationAge(notification) < EMilliSeconds.Day;
