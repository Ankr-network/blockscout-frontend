import { FilterTag } from 'modules/notifications/components/FilterTag';
import {
  EAdditionalNotificationsFilter,
  ENotificationsFilter,
} from 'modules/notifications/const';
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

  const { notificationsAmount: unseenNotificationsAmount } = useNotifications({
    skipFetching: true,
    only_unseen: true,
  });

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
