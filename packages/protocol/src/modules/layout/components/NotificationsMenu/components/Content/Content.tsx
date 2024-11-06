import { useMemo } from 'react';

import { ENotificationsFilter } from 'modules/notifications/const';
import { useNotifications } from 'modules/notifications/hooks/useNotifications';
import { filterNotificationByCategory } from 'modules/notifications/utils/filterNotificationByCategory';
import { INotificationProps } from 'modules/notifications/types';
import { mapNotificationsToRowData } from 'modules/notifications/utils/mapNotificationsToRowData';
import { useOnMount } from 'modules/common/hooks/useOnMount';

import { EmptyState } from '../EmptyState';
import { ErrorState } from '../ErrorState';
import { Notifications } from '../Notifications';
import { LoadingState } from '../LoadingState';

interface IContentProps {
  activeFilter: ENotificationsFilter;
}

export const Content = ({ activeFilter }: IContentProps) => {
  const { isError, isLoading, notifications } = useNotifications({
    skipFetching: false,
    limit: 15,
  });

  const { handleRefetchNotifications } = useNotifications({
    only_unseen: true,
  });

  useOnMount(() => {
    handleRefetchNotifications();
  });

  const preparedNotifications: INotificationProps[] = useMemo(() => {
    return (
      notifications?.notifications
        .filter(notification =>
          filterNotificationByCategory(notification, activeFilter),
        )
        .map(mapNotificationsToRowData) ?? []
    );
  }, [activeFilter, notifications]);

  if (isLoading) return <LoadingState />;

  if (isError) return <ErrorState />;

  if (preparedNotifications.length === 0) return <EmptyState />;

  return <Notifications notifications={preparedNotifications} />;
};
