import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';
import { LoadableButton } from 'uiKit/LoadableButton';
import { useRedirectForNotPersonalGroup } from 'modules/notifications/hooks/useRedirectForNotPersonalGroup';

import { notificationsTranslation } from './translation';
import { useNotificationsPageStyles } from './useNotificationsPageStyles';
import { Filters } from './components/Filters';
import { Content } from './components/Content';
import { useNotificationsPage } from './useNotificationsPage';
import { NotificationsMenu } from './components/NotificationsMenu';
import { FilterButton } from './components/FilterButton';

export const NotificationsPage = () => {
  useRedirectForNotPersonalGroup();

  const { classes } = useNotificationsPageStyles();

  const { keys, t } = useTranslation(notificationsTranslation);

  const {
    activeFilter,
    handleChangeFilter,
    handleRefetchUnseenNotifications,
    hasBroadcastNotificationsOnly,
    hasMore,
    isError,
    isInitializing,
    isLoading,
    loadMore,
    notifications,
    shouldShowUnread,
    toggleShowUnread,
  } = useNotificationsPage();

  useSetBreadcrumbs([
    {
      title: t(keys.breadcrumbs),
    },
  ]);

  return (
    <div className={classes.root}>
      <div className={classes.titleRoot}>
        <Typography variant="h5" className={classes.title}>
          {t(keys.title)}
        </Typography>
        <div className={classes.filters}>
          <FilterButton
            isActive={shouldShowUnread}
            handleClick={toggleShowUnread}
          />
          <NotificationsMenu
            hasBroadcastNotificationsOnly={hasBroadcastNotificationsOnly}
            isEmptyNotifications={notifications.length === 0}
          />
        </div>
      </div>
      <Filters
        activeFilter={activeFilter}
        handleChangeFilter={handleChangeFilter}
        handleClickShowUnread={toggleShowUnread}
        hasBroadcastNotificationsOnly={hasBroadcastNotificationsOnly}
        isEmptyNotifications={notifications.length === 0}
        isUnread={shouldShowUnread}
      />
      <Content
        handleRefetchUnseenNotifications={handleRefetchUnseenNotifications}
        isError={isError}
        isLoading={isInitializing}
        notifications={notifications}
      />
      {hasMore && !isError && (
        <div className={classes.showMoreWrapper}>
          <LoadableButton
            loading={isLoading}
            onClick={loadMore}
            size="small"
            color="primary"
            variant="outlined"
            className={classes.showMore}
          >
            {t(keys.showMore)}
          </LoadableButton>
        </div>
      )}
    </div>
  );
};
