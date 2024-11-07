import { Checkbox, Typography } from '@mui/material';
import { ENotificationCategory } from 'multirpc-sdk';
import { useMemo } from 'react';

import { FilterTag } from 'modules/notifications/components/FilterTag';
import {
  EAdditionalNotificationsFilter,
  ENotificationsFilter,
} from 'modules/notifications/const';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { useNotifications } from 'modules/notifications/hooks/useNotifications';

import { useFiltersStyles } from './useFiltersStyles';
import {
  INotificationsMenuProps,
  NotificationsMenu,
} from '../NotificationsMenu';
import { notificationsTranslation } from '../../translation';

interface IFiltersProps extends INotificationsMenuProps {
  activeFilter: ENotificationsFilter;
  isUnread: boolean;
  handleClickShowUnread: () => void;
  handleChangeFilter: (filter: ENotificationsFilter) => void;
}

export const Filters = ({
  activeFilter,
  handleChangeFilter,
  handleClickShowUnread,
  isEmptyNotifications,
  isUnread,
}: IFiltersProps) => {
  const { classes } = useFiltersStyles();

  const { keys, t } = useTranslation(notificationsTranslation);

  const { notifications: notificationsResponse } = useNotifications({
    skipFetching: true,
    only_unseen: true,
  });
  const notifications = notificationsResponse.notifications;

  const unseenBillingNotificationsAmount = useMemo(
    () =>
      notifications.filter(
        notification => notification.category === ENotificationCategory.BILLING,
      ).length,
    [notifications],
  );

  const unseenSystemNotificationsAmount = useMemo(
    () =>
      notifications.filter(
        notification => notification.category === ENotificationCategory.SYSTEM,
      ).length,
    [notifications],
  );

  const unseenNewsNotificationsAmount = useMemo(
    () =>
      notifications.filter(
        notification => notification.category === ENotificationCategory.NEWS,
      ).length,
    [notifications],
  );

  const allUnseenNotificationsAmount =
    unseenBillingNotificationsAmount +
    unseenSystemNotificationsAmount +
    unseenNewsNotificationsAmount;

  return (
    <div className={classes.root}>
      <div className={classes.fitlers}>
        <FilterTag
          amount={allUnseenNotificationsAmount}
          isActive={activeFilter === EAdditionalNotificationsFilter.ALL}
          category={EAdditionalNotificationsFilter.ALL}
          handleChangeFilter={handleChangeFilter}
        />
        <FilterTag
          amount={unseenBillingNotificationsAmount}
          isActive={activeFilter === ENotificationCategory.BILLING}
          category={ENotificationCategory.BILLING}
          handleChangeFilter={handleChangeFilter}
        />
        <FilterTag
          amount={unseenSystemNotificationsAmount}
          isActive={activeFilter === ENotificationCategory.SYSTEM}
          category={ENotificationCategory.SYSTEM}
          handleChangeFilter={handleChangeFilter}
        />
        <FilterTag
          amount={unseenNewsNotificationsAmount}
          isActive={activeFilter === ENotificationCategory.NEWS}
          category={ENotificationCategory.NEWS}
          handleChangeFilter={handleChangeFilter}
        />
      </div>
      <div className={classes.menuWrapper}>
        <Checkbox
          checked={isUnread}
          className={classes.checkbox}
          onClick={handleClickShowUnread}
        />
        <Typography variant="body3" color="textSecondary">
          {t(keys.showUnread)}
        </Typography>
        <NotificationsMenu isEmptyNotifications={isEmptyNotifications} />
      </div>
    </div>
  );
};
