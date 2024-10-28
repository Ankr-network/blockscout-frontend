import { Checkbox, Typography } from '@mui/material';
import { ENotificationCategory } from 'multirpc-sdk';

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

  const { notifications } = useNotifications({
    skipFetching: true,
    only_unseen: true,
  });

  const unseenBillingNotificationsAmount = notifications.notifications.filter(
    notification => notification.category === ENotificationCategory.BILLING,
  ).length;

  const unseenSystemNotificationsAmount = notifications.notifications.filter(
    notification => notification.category === ENotificationCategory.SYSTEM,
  ).length;

  return (
    <div className={classes.root}>
      <div className={classes.fitlers}>
        <FilterTag
          amount={
            unseenBillingNotificationsAmount + unseenSystemNotificationsAmount
          }
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
