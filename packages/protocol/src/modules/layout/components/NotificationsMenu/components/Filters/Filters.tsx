import { useMemo } from 'react';

import { FilterTag } from 'modules/notifications/components/FilterTag';
import {
  EAdditionalNotificationsFilter,
  ENotificationsFilter,
} from 'modules/notifications/const';
import { EMilliSeconds } from 'modules/common/constants/const';
import { getNotificationAge } from 'modules/notifications/utils/getNotificationAge';
import { isBroadcastNotification } from 'modules/notifications/utils/isBroadcastNotification';
import { useNotifications } from 'modules/notifications/hooks/useNotifications';

import { useFiltersStyles } from './useFiltersStyles';

interface IFiltersProps {
  activeFilter: ENotificationsFilter;
  handleChangeFilter: (filter: ENotificationsFilter) => void;
}

export const Filters = ({
  activeFilter,
  handleChangeFilter,
}: IFiltersProps) => {
  const { classes } = useFiltersStyles();

  const { notifications: notificationsResponse } = useNotifications({
    skipFetching: true,
    only_unseen: true,
  });

  const notifications = notificationsResponse.notifications;

  const unseenNotificationsAmount = useMemo(
    () =>
      notifications.filter(
        notification =>
          isBroadcastNotification(notification) &&
          getNotificationAge(notification) < EMilliSeconds.Day,
      ).length,
    [notifications],
  );

  return (
    <div className={classes.root}>
      <FilterTag
        isTransparent
        isActive={activeFilter === EAdditionalNotificationsFilter.ALL}
        shouldHideIcon
        shouldShowAmountInBraces
        category={EAdditionalNotificationsFilter.ALL}
        handleChangeFilter={handleChangeFilter}
      />
      <FilterTag
        isTransparent
        amount={unseenNotificationsAmount}
        isActive={activeFilter === EAdditionalNotificationsFilter.UNREAD}
        shouldShowAmountInBraces
        shouldHideIcon
        category={EAdditionalNotificationsFilter.UNREAD}
        handleChangeFilter={handleChangeFilter}
      />
    </div>
  );
};
