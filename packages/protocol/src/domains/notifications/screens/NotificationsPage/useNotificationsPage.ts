import { useState, useCallback } from 'react';

import {
  EAdditionalNotificationsFilter,
  ENotificationsFilter,
} from 'modules/notifications/const';
import { useNotifications } from 'modules/notifications/hooks/useNotifications';
import { useOnMount } from 'modules/common/hooks/useOnMount';

import { useNotificationsPageData } from './useNotificationsPageData';

export const useNotificationsPage = () => {
  const [activeFilter, setActiveFilter] = useState<ENotificationsFilter>(
    EAdditionalNotificationsFilter.ALL,
  );
  const [shouldShowUnread, setShouldShowUnread] = useState(false);

  const { handleRefetchNotifications } = useNotifications({
    only_unseen: true,
  });

  const toggleShowUnread = useCallback(() => {
    setShouldShowUnread(shouldShow => !shouldShow);
  }, [setShouldShowUnread]);

  const handleChangeFilter = useCallback(
    (filter: ENotificationsFilter) => {
      setActiveFilter(filter);
    },
    [setActiveFilter],
  );

  useOnMount(() => {
    handleRefetchNotifications();
  });

  const {
    hasMore,
    isError,
    isInitializing,
    isLoading,
    loadMore,
    notifications,
  } = useNotificationsPageData({ filter: activeFilter, shouldShowUnread });

  const handleRefetchUnseenNotifications = useCallback(() => {
    handleRefetchNotifications();
  }, [handleRefetchNotifications]);

  return {
    activeFilter,
    hasMore,
    isInitializing,
    isError,
    isLoading,
    loadMore,
    notifications,
    shouldShowUnread,
    toggleShowUnread,
    handleChangeFilter,
    handleRefetchUnseenNotifications,
  };
};
