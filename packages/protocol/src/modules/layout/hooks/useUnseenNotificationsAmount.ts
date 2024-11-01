import { IGetNotificationsResponse } from 'multirpc-sdk';
import { useMemo } from 'react';

import { EMilliSeconds } from 'modules/common/constants/const';
import { getNotificationAge } from 'modules/notifications/utils/getNotificationAge';
import { isBroadcastNotification } from 'modules/notifications/utils/isBroadcastNotification';

export interface IUseUnseenNotificationsAmountProps {
  notificationsResponse: IGetNotificationsResponse;
}

export const useUnseenNotificationsAmount = ({
  notificationsResponse,
}: IUseUnseenNotificationsAmountProps) => {
  const notifications = notificationsResponse.notifications;

  const unseenNotificationsAmount = useMemo(
    () =>
      notifications.filter(notification =>
        isBroadcastNotification(notification)
          ? getNotificationAge(notification) < EMilliSeconds.Day
          : true,
      ).length,
    [notifications],
  );

  return { unseenNotificationsAmount };
};
